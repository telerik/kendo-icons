const fs = require('fs');
const { resolve } = require('path');
const pkgRoot = resolve(__dirname, '..');

const _ = require('lodash');

const { paths } = require('../../../scripts/shared');
const { svgCsTemplate, indexCsTemplate } = require('./templates');

// Prepare clean
fs.rmSync( resolve( pkgRoot, 'src-cs/Telerik.SvgIcons/Icons' ), { recursive: true, force: true } );
fs.mkdirSync( resolve( pkgRoot, 'src-cs/Telerik.SvgIcons/Icons' ), { recursive: true } );

const iconsHast = JSON.parse( fs.readFileSync( paths.icons.hast, 'utf-8' ) );
const aliasesMap = JSON.parse( fs.readFileSync( paths.icons.aliases, 'utf-8' ) );


function prepareNuget() {
    const iconList = [];
    let iconName;
    let iconCsName;
    let iconSvgContent;
    let filename;
    let content;

    iconsHast.icons.forEach(iconDef => {
        iconName = iconDef.name;
        iconCsName = _.upperFirst( _.camelCase( iconName ) );
        iconSvgContent = iconDef.svgContent;
        filename = resolve( pkgRoot, `src-cs/Telerik.SvgIcons/Icons/${iconCsName}.cs` );

        // Collect tags from categories
        const tags = iconDef.categories && iconDef.categories.length ? iconDef.categories : undefined;

        // Populate variant SVG content from variantHast when available.
        const variantHast = iconDef.variantHast || {};
        const variants = {
            'solid': variantHast.solid ? variantHast.solid.svgContent : '',
            'outline': variantHast.outline ? variantHast.outline.svgContent : '',
            'duotone': variantHast.duotone ? variantHast.duotone.svgContent : ''
        };

        iconList.push({
            iconName: iconName,
            iconCsName: iconCsName
        });

        content = svgCsTemplate({
            iconName: iconName,
            iconCsName: iconCsName,
            iconSvgContent: iconSvgContent,
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
                sourceCsName: _.upperFirst( _.camelCase( sourceIconName ) ),
                aliasCsName: _.upperFirst( _.camelCase( aliasName ) )
            };
        });

    fs.writeFileSync(
        'src-cs/Telerik.SvgIcons/SvgIcon.cs',
        indexCsTemplate( iconList, aliasReExports )
    );
}

prepareNuget();
