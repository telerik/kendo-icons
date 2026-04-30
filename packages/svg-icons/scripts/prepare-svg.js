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
const aliasesMap = JSON.parse( fs.readFileSync( paths.icons.aliases, 'utf-8' ) );

// Load deprecation map (icon-name -> replacement or null)
const deprecatedIconsPath = resolve( __dirname, '../../../v4-v5-migration-assets/deprecated-icons.json' );
const deprecatedIcons = fs.existsSync( deprecatedIconsPath )
    ? JSON.parse( fs.readFileSync( deprecatedIconsPath, 'utf-8' ) )
    : {};


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
        iconSvgContent = iconDef.hast[0].properties.d;
        filename = resolve( `src/icons/${iconName}.ts` );

        // Collect tags from categories
        const tags = iconDef.categories && iconDef.categories.length ? iconDef.categories : undefined;

        // Build variant data. Always emit solid, outline, and duotone.
        // All variants are empty placeholders for v4.
        // TODO (v5): Populate variant SVG content from iconDef.variantHast.
        const variants = { 'solid': '', 'outline': '', 'duotone': '' };

        // Check deprecation status
        const deprecated = iconName in deprecatedIcons
            ? { replacement: deprecatedIcons[iconName] || null }
            : undefined;

        iconList.push({
            iconName,
            iconTsName,
            deprecated
        });

        content = svgTsTemplate({
            iconName,
            iconTsName,
            iconSvgContent,
            tags,
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
        resolve( 'dist/icon-list.json' )
    );

    fs.copyFileSync(
        paths.icons.json,
        resolve( 'dist/icons.json' )
    );
}

prepareSvgIcons();
