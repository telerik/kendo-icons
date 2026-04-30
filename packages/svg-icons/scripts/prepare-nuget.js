const fs = require('fs');
const { resolve } = require('path');

const _ = require('lodash');

const { paths } = require('../../../scripts/shared');
const { svgCsTemplate, indexCsTemplate } = require('./templates');

// Prepare clean
fs.rmSync( 'src-cs/Telerik.SvgIcons/Icons', { recursive: true, force: true } );
fs.mkdirSync( 'src-cs/Telerik.SvgIcons/Icons', { recursive: true } );

const iconsHast = JSON.parse( fs.readFileSync( paths.icons.hast, 'utf-8' ) );
const aliasesMap = JSON.parse( fs.readFileSync( paths.icons.aliases, 'utf-8' ) );
const deprecatedIconsPath = resolve( __dirname, '../../../v4-v5-migration-assets/deprecated-icons.json' );
const deprecatedIcons = fs.existsSync( deprecatedIconsPath )
    ? JSON.parse( fs.readFileSync( deprecatedIconsPath, 'utf-8' ) )
    : {};


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
        iconSvgContent = iconDef.hast[0].properties.d;
        filename = resolve( `src-cs/Telerik.SvgIcons/Icons/${iconCsName}.cs` );

        // Build variant data. Always emit solid, outline, and duotone.
        // All variants are empty placeholders for v4.
        // TODO (v5): Populate variant SVG content from iconDef.variantHast.
        const variants = { 'solid': '', 'outline': '', 'duotone': '' };
        const deprecated = iconName in deprecatedIcons
            ? { replacement: deprecatedIcons[iconName] || null }
            : undefined;

        iconList.push({
            iconName: iconName,
            iconCsName: iconCsName,
            deprecated
        });

        content = svgCsTemplate({
            iconName: iconName,
            iconCsName: iconCsName,
            iconSvgContent: iconSvgContent,
            variants,
            deprecated
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
