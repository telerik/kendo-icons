const fs = require('fs');
const { resolve } = require('path');

const { paths } = require('../../../scripts/shared');
const { iconsCsTemplate } = require('./templates');

const iconsHast = JSON.parse( fs.readFileSync( paths.icons.hast, 'utf-8' ) );
const aliasesMap = JSON.parse( fs.readFileSync( paths.icons.aliases, 'utf-8' ) );
const deprecatedIconsPath = resolve( __dirname, '../../../v4-v5-migration-assets/deprecated-icons.json' );
const deprecatedIcons = fs.existsSync( deprecatedIconsPath )
    ? JSON.parse( fs.readFileSync( deprecatedIconsPath, 'utf-8' ) )
    : {};

// Merge aliases.json entries into each icon's aliases array.
const iconNames = new Set( iconsHast.icons.map( i => i.name ) );
const existingAliases = new Set();
iconsHast.icons.forEach( iconDef => iconDef.aliases.forEach( a => existingAliases.add( a ) ) );

const reverseAliases = {};
Object.entries( aliasesMap ).forEach( ([ aliasName, sourceIconName ]) => {
    if ( iconNames.has( aliasName ) || existingAliases.has( aliasName ) ) {
        return;
    }
    if ( !reverseAliases[ sourceIconName ] ) {
        reverseAliases[ sourceIconName ] = [];
    }
    reverseAliases[ sourceIconName ].push( aliasName );
});

iconsHast.icons.forEach( iconDef => {
    const extra = reverseAliases[ iconDef.name ];
    if ( extra ) {
        iconDef.aliases.push( ...extra );
    }
});


function prepareNuget() {

    const telerikIconsCs = iconsCsTemplate( 'Telerik.FontIcons', iconsHast.icons, deprecatedIcons, aliasesMap );

    fs.writeFileSync(
        resolve( 'src-cs/Telerik.FontIcons/Icons/FontIcon.cs' ),
        telerikIconsCs
    );

    return Promise.resolve();
}

prepareNuget();
