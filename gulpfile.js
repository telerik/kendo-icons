const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const fse = require('fs-extra');
const glob = require('glob');
const gulp = require('gulp');
const svg2ttf = require('svg2ttf');

const { getArgs, logger, colorTheme } = require('./scripts/utils');
const svgo = require('./scripts/svgo');
const svgParser = require('svg-parser');
const { svgFontTemplate, svgTsTemplate, indexTsTemplate, fontFileTemplate, fontHtmlTemplate } = require('./scripts/templates');


const unicodeStart = parseInt('e000', 16);
let unicodePointer;


const paths = {
    iconsJson: path.resolve( 'src/icons/icons.json' ),
    iconsList: path.resolve( 'src/icons/icons-list.json' ),
    iconsHast: path.resolve( '.tmp/icons/icons-hast.json' ),
    iconsSrcPath: path.resolve( 'src/icons/solid' ),
    iconsTempPath: path.resolve( '.tmp/icons/solid' ),
    fontJson: path.resolve( '.tmp/icons/font.json' ),
    fontSvg: path.resolve( '.tmp/icons/kendo-font-icons.svg' ),
    fontTtf: path.resolve( '.tmp/icons/kendo-font-icons.ttf' ),
    svgGlob: '**/*.svg'
};


// #region svg files
gulp.task( 'svg:update-list', done => {
    const iconsJson = JSON.parse( fse.readFileSync( paths.iconsJson, 'utf-8') );
    const iconsList = {
        list: [],
        emptyIndex: -1
    };

    iconsJson.icons.forEach( ( iconDef, index ) => {
        let unicodeDecimal = parseInt( iconDef.unicode, 16 ) - unicodeStart;
        iconsList.list[unicodeDecimal] = iconDef.name;

        if ( iconsList.emptyIndex === -1 && unicodeDecimal > index  ) {
            iconsList.emptyIndex = index;
        }
    });

    fse.writeFileSync( paths.iconsList, JSON.stringify( iconsList, null, 4 ) );

    done();
});

gulp.task( 'svg:migrate', done => {

    const iconsJson = JSON.parse( fse.readFileSync( paths.iconsJson, 'utf-8') );

    iconsJson.icons.forEach( iconDef => {
        let iconName = iconDef.name;
        let iconOldName = iconDef.aliases[0];
        let iconPath = path.resolve( paths.iconsSrcPath, `${iconName}.svg` );
        let iconOldPath;

        if ( fse.existsSync( iconPath ) ) {
            return;
        }

        if ( typeof iconOldName === 'string' ) {
            iconOldPath = path.resolve( paths.iconsSrcPath, `${iconOldName}.svg` );

            if ( fse.existsSync( iconOldPath) ) {
                logger.info( `Renaming icon ${iconOldName} to ${iconName}` );
                fse.moveSync( iconOldPath, iconPath );

                return;
            }
        }

        logger.warn( `${iconName}.svg does not eixst in source files.` );

    });

    done();
});

gulp.task( 'svg:dist', () => {
    let files = glob.sync( path.resolve( paths.iconsSrcPath, paths.svgGlob ) );

    fse.emptyDirSync(paths.iconsTempPath);

    return Promise.all(
        files.map( file => {
            let svgPath = fse.readFileSync(file, 'utf-8');

            return svgo.optimize(svgPath).then( pass1 => {
                svgo.optimize(pass1.data).then( pass2 => {
                    fse.writeFileSync( path.resolve( paths.iconsTempPath, path.basename( file) ), pass2.data );
                });
            });
        })
    );
});
// #endregion


// #region build intermediate files
gulp.task('build:hast', done => {
    const output = { icons: [] };
    const iconsJson = JSON.parse( fse.readFileSync( paths.iconsJson, 'utf-8') );

    iconsJson.icons.forEach( iconDef => {
        let iconName = iconDef.name;
        let iconFile = path.resolve( paths.iconsTempPath, `${iconName}.svg` );

        // Skip files which are missing from file system
        if ( fse.pathExistsSync( iconFile ) === false ) {
            return;
        }

        let content = fse.readFileSync( iconFile, 'utf-8' );
        let parsed = svgParser.parse( content );

        output.icons.push({
            ...iconDef,
            hast: parsed.children[0].children
        });
    });

    fse.writeFileSync(paths.iconsHast, JSON.stringify(output, null, 4));

    done();

});

gulp.task('build:font-json', done => {
    const iconsHast = JSON.parse( fse.readFileSync( paths.iconsHast, 'utf-8' ) );
    const fontJson = {
        fontName: 'kendo-font-icons',
        glyphs: []
    };

    iconsHast.icons.forEach( iconDef  => {
        fontJson.glyphs.push({
            name: iconDef.name,
            ligatures: [],
            unicode: iconDef.unicode,
            d: iconDef.hast[0].properties.d
        });
    });

    fse.writeFileSync( paths.fontJson, JSON.stringify( fontJson, null, 4 ) );

    done();
});

gulp.task('build:svg-font', done => {
    const fontJson = JSON.parse( fse.readFileSync( paths.fontJson, 'utf-8' ) );
    fse.writeFileSync( paths.fontSvg, svgFontTemplate( fontJson ) );

    done();
});


gulp.task('build:ttf-font', done => {
    const ttf = svg2ttf( fse.readFileSync( paths.fontSvg, 'utf8' ) );
    fse.writeFileSync( paths.fontTtf, new Buffer.from( ttf.buffer ) );

    done();
});

const buildAll = gulp.series( 'svg:dist', 'build:hast', 'build:font-json', 'build:svg-font', 'build:ttf-font' );
buildAll.displayName = 'build:all';
gulp.task( buildAll );
//#endregion


// #region svg icons
gulp.task('pkg-svg:update', done => {
    const iconsHast = JSON.parse( fse.readFileSync( paths.iconsHast, 'utf-8' ) );
    const iconList = [];
    let iconName;
    let iconTsName;
    let iconSvgContent;
    let filename;
    let content;

    fse.emptyDirSync( './packages/svg-icons/src/icons' );

    iconsHast.icons.forEach(iconDef => {
        iconName = iconDef.name;
        iconTsName = _.camelCase( iconName );
        iconSvgContent = iconDef.hast[0].properties.d;
        filename = path.resolve( `./packages/svg-icons/src/icons/${iconName}.ts` );

        iconList.push({
            iconName: iconName,
            iconTsName: iconTsName
        });

        content = svgTsTemplate({
            iconName: iconName,
            iconTsName: iconTsName,
            iconSvgContent: iconSvgContent
        });

        fse.writeFileSync( filename, content );
    });

    fse.writeFileSync(
        './packages/svg-icons/src/index.ts',
        indexTsTemplate( iconList )
    );

    done();
});

const pkgSvg = gulp.series( 'svg:dist', 'build:hast', 'pkg-svg:update' );
pkgSvg.displayName = 'pkg-svg';
gulp.task( pkgSvg );
// #endregion


// #region font icons
gulp.task('pkg-font:update', done => {
    const iconsHast = JSON.parse( fse.readFileSync( paths.iconsHast, 'utf-8' ) );
    let iconName;
    let aliases;
    let unicode;
    let content = [];

    fse.emptyDirSync( './packages/font-icons/dist' );

    iconsHast.icons.forEach( iconDef => {
        iconName = iconDef.name;
        aliases = iconDef.aliases;
        unicode = iconDef.unicode;

        content.push(`.k-i-${iconName}::before { content: "\\${unicode}"; } `);
        aliases.forEach( alias => content.push(`.k-i-${alias}::before { content: "\\${unicode}"; } `) );
    });

    fse.writeFileSync(
        path.resolve( 'packages/font-icons/scss/_icons.scss' ),
        content.join( '\n' )
    );

    fse.copyFileSync(
        path.resolve( '.tmp/icons/kendo-font-icons.ttf' ),
        path.resolve( 'packages/font-icons/dist/kendo-font-icons.ttf' )
    );

    fse.writeFileSync(
        path.resolve( 'packages/font-icons/scss/_font.scss' ),
        fontFileTemplate( path.resolve( 'packages/font-icons/dist/kendo-font-icons.ttf' ) )
    );

    fse.writeFileSync(
        path.resolve( 'packages/font-icons/html/index.html' ),
        fontHtmlTemplate( iconsHast.icons )
    );

    done();
});


const pkgFont = gulp.series( 'build:all', 'pkg-font:update' );
pkgFont.displayName = 'pkg-font';
gulp.task( pkgFont );
// #endregion


// Exports



// exports.pkgAll = gulp.series( 'build:all', 'pkg-svg:update', 'pkg-font:update' );
// exports.pkgAll.displayName = 'pkg-all';
