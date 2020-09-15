const fs = require('fs-extra');
const path = require('path');
const logger = require('gulplog');

const iconsJsonPath = path.resolve( 'src/icons/icons.json' );
const iconsSrcPath = path.resolve( 'src/icons/solid/' );
const iconsJson = JSON.parse( fs.readFileSync( iconsJsonPath, 'utf-8') );

let dirty = false;

iconsJson.icons.forEach( iconDef => {
    let iconName = iconDef.name;
    let iconOldName = iconDef.aliases[0];
    let iconPath = path.resolve( iconsSrcPath, `${iconName}.svg` );
    let iconOldPath;

    if ( fs.existsSync( iconPath ) ) {
        return;
    }

    dirty = true;

    if ( typeof iconOldName === 'string' ) {
        iconOldPath = path.resolve( paths.iconsSrcPath, `${iconOldName}.svg` );

        if ( fs.existsSync( iconOldPath) ) {
            console.info( `Renaming icon ${iconOldName} to ${iconName}` );
            fs.renameSync( iconOldPath, iconPath );

            return;
        }
    }

    console.warn( `${iconName}.svg does not eixst in source files.` );

});

if (dirty === false ) {
    console.info( `No icons needed migration` );
}
