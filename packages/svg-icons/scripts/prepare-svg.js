const fs = require('fs');
const { resolve } = require('path');
const pkgRoot = resolve(__dirname, '..');

const _ = require('lodash');

const { paths, prepareSvg, buildHast } = require('../../../scripts/shared');
const svgoConfig = require('../../../svgo.config.js');
const { svgTsTemplate, indexTsTemplate } = require('./templates');

// Prepare clean src/icons and dist dirs
fs.rmSync( resolve( pkgRoot, 'src/icons' ), { recursive: true, force: true } );
fs.mkdirSync( resolve( pkgRoot, 'src/icons' ), { recursive: true } );

fs.rmSync( resolve( pkgRoot, 'dist' ), { recursive: true, force: true } );
fs.mkdirSync( resolve( pkgRoot, 'dist' ) );

// Prepare svg — pass the config so stroke attrs are stripped for the JS module
prepareSvg( svgoConfig );

// Build hast from svg
buildHast();

const iconsHast = JSON.parse( fs.readFileSync( paths.icons.hast, 'utf-8' ) );
const aliasesMap = JSON.parse( fs.readFileSync( paths.icons.aliases, 'utf-8' ) );


function prepareSvgIcons() {
    const iconList = [];
    let iconName;
    let iconTsName;
    let iconSvgContent;
    let filename;
    let content;

    iconsHast.icons.forEach(iconDef => {
        iconName = iconDef.name;
        iconTsName = _.camelCase( `${iconName}-icon` );
        iconSvgContent = iconDef.svgContent;
        filename = resolve( `src/icons/${iconName}.ts` );

        // Collect tags from icons.json
        const tags = iconDef.tags && iconDef.tags.length ? iconDef.tags : undefined;

        // Populate variant SVG content from variantHast when available.
        const variantHast = iconDef.variantHast || {};
        const variants = {
            'solid': variantHast.solid ? variantHast.solid.svgContent : '',
            'outline': variantHast.outline ? variantHast.outline.svgContent : '',
            'duotone': variantHast.duotone ? variantHast.duotone.svgContent : ''
        };

        iconList.push({
            iconName,
            iconTsName
        });

        content = svgTsTemplate({
            iconName,
            iconTsName,
            iconSvgContent,
            tags,
            variants
        });

        fs.writeFileSync( filename, content );
    });

    // Build alias re-exports from aliases.json (newName -> sourceIconName)
    const iconNames = new Set( iconList.map( i => i.iconName ) );
    const aliasReExports = Object.entries( aliasesMap )
        .map( ([ aliasName, sourceIconName ]) => {
            if ( !iconNames.has( sourceIconName ) ) {
                throw new Error( `aliases.json: alias "${aliasName}" references unknown icon "${sourceIconName}"` );
            }
            return {
                sourceIconName,
                sourceTsName: _.camelCase( `${sourceIconName}-icon` ),
                aliasTsName: _.camelCase( `${aliasName}-icon` )
            };
        });

    fs.writeFileSync(
        'src/index.ts',
        indexTsTemplate( iconList, aliasReExports )
    );

    fs.copyFileSync(
        paths.icons.list,
        resolve( pkgRoot, 'dist/icon-list.json' )
    );

    fs.copyFileSync(
        paths.icons.json,
        resolve( pkgRoot, 'dist/icons.json' )
    );
}

prepareSvgIcons();
