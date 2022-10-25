const fs = require('fs-extra');
const path = require('path');

const iconsJsonPath = path.resolve( 'src/telerik-icons/icons.json' );
const iconsSrcPath = path.resolve( 'src/telerik-icons/solid/' );
const iconsJson = JSON.parse( fs.readFileSync( iconsJsonPath, 'utf-8') );

let dirty = false;

iconsJson.forEach( iconDef => {
    let iconName = iconDef.name;
    let iconOldName = iconDef.aliases[0];
    let iconPath = path.resolve( iconsSrcPath, `${iconName}.svg` );
    let iconOldPath;

    if ( fs.existsSync( iconPath ) ) {
        return;
    }

    dirty = true;

    if ( typeof iconOldName === 'string' ) {
        iconOldPath = path.resolve( iconsSrcPath, `${iconOldName}.svg` );

        if ( fs.existsSync( iconOldPath) ) {
            // eslint-disable-next-line no-console
            console.info( `Renaming icon ${iconOldName} to ${iconName}` );
            fs.renameSync( iconOldPath, iconPath );

            return;
        }
    }

    // eslint-disable-next-line no-console
    console.warn( `${iconName}.svg does not exist in source files.` );

});

if (dirty === false ) {
    // eslint-disable-next-line no-console
    console.info( `No icons needed migration` );
}
