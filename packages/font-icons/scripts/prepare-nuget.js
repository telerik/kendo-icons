const fs = require('fs');
const { resolve } = require('path');

const { paths } = require('../../../scripts/shared');
const { iconsCsTemplate } = require('./templates');

const iconsHast = JSON.parse( fs.readFileSync( paths.icons.hast, 'utf-8' ) );
const deprecatedIconsPath = resolve( __dirname, '../../../v4-v5-migration-assets/deprecated-icons.json' );
const deprecatedIcons = fs.existsSync( deprecatedIconsPath )
    ? JSON.parse( fs.readFileSync( deprecatedIconsPath, 'utf-8' ) )
    : {};


function prepareNuget() {

    const telerikIconsCs = iconsCsTemplate( 'Telerik.FontIcons', iconsHast.icons, deprecatedIcons );

    fs.writeFileSync(
        resolve( 'src-cs/Telerik.FontIcons/Icons/FontIcon.cs' ),
        telerikIconsCs
    );

    return Promise.resolve();
}

prepareNuget();
