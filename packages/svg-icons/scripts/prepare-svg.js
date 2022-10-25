const fs = require('fs');
const { resolve } = require('path');

const _ = require('lodash');

const { paths, prepareSvg, buildHast } = require('../../../scripts/shared');
const { svgTsTemplate, indexTsTemplate } = require('./templates');

// Prepare clean src/icons and dist dirs
fs.rmSync( 'src/icons', { recursive: true, force: true } );
fs.mkdirSync( 'src/icons', { recursive: true } );

fs.rmSync( 'dist', { recursive: true, force: true } );
fs.mkdirSync( 'dist' );

// Prepare svg
prepareSvg();

// Build hast from svg
buildHast();

const iconsHast = JSON.parse( fs.readFileSync( paths.icons.hast, 'utf-8' ) );


function prepareSvgIcons() {
    const iconList = [];
    let iconName;
    let iconTsName;
    let iconSvgContent;
    let filename;
    let content;

    iconsHast.icons.forEach(iconDef => {
        iconName = `${iconDef.name}-icon`;
        iconTsName = _.camelCase( iconName );
        iconSvgContent = iconDef.hast[0].properties.d;
        filename = resolve( `src/icons/${iconName}.ts` );

        iconList.push({
            iconName: iconName,
            iconTsName: iconTsName
        });

        content = svgTsTemplate({
            iconName: iconName,
            iconTsName: iconTsName,
            iconSvgContent: iconSvgContent
        });

        fs.writeFileSync( filename, content );
    });

    fs.writeFileSync(
        'src/index.ts',
        indexTsTemplate( iconList )
    );

    fs.copyFileSync(
        paths.icons.list,
        resolve( 'dist/icon-list.json' )
    );

    fs.copyFileSync(
        paths.icons.json,
        resolve( 'dist/icons.json' )
    );
}

prepareSvgIcons();
