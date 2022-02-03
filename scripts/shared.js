const fs = require('fs');
const { resolve, basename } = require('path');
const glob = require('glob');
const { optimize } = require('svgo');
const svgParser = require('svg-parser');

const root = resolve(__dirname, '..');

const paths = {
    icons: {
        src: resolve( root, 'src/icons/solid' ),
        temp: resolve( root, '.tmp/icons/solid' ),
        json: resolve( root, 'src/icons/icons.json' ),
        list: resolve( root, 'src/icons/icons-list.json' ),
        hast: resolve( root, '.tmp/icons/icons-hast.json' )
    },
    svgGlob: '**/*.svg'
};

function prepareSvg() {
    let files = glob.sync( resolve( paths.icons.src, paths.svgGlob ) );

    fs.rmdirSync( paths.icons.temp, { force: true, recursive: true } );
    fs.mkdirSync( paths.icons.temp, { recursive: true } );

    files.forEach( file => {
        let svgPath = fs.readFileSync( file, 'utf-8' );

        svgPath = optimize( svgPath ).data;

        fs.writeFileSync( resolve( paths.icons.temp, basename( file ) ), svgPath );
    });

    return Promise.resolve();
}
prepareSvg.displayName = 'svg:prepare';


function buildHast() {
    const output = { icons: [] };
    const iconsJson = JSON.parse( fs.readFileSync( paths.icons.json, 'utf-8') );

    iconsJson.icons.forEach( iconDef => {
        let iconName = iconDef.name;
        let iconFile = resolve( paths.icons.temp, `${iconName}.svg` );

        // Skip files which are missing from file system
        if ( fs.existsSync( iconFile ) === false ) {
            return;
        }

        let content = fs.readFileSync( iconFile, 'utf-8' );
        let parsed = svgParser.parse( content );

        output.icons.push({
            ...iconDef,
            hast: parsed.children[0].children
        });
    });

    fs.writeFileSync(paths.icons.hast, JSON.stringify(output, null, 4));

    return Promise.resolve();
}
buildHast.displayName = 'build:hast';


module.exports.paths = paths;
module.exports.prepareSvg = prepareSvg;
module.exports.buildHast = buildHast;
