const fs = require('fs-extra');
const path = require('path');

const iconsJsonPath = path.resolve( 'src/icons/icons.json' );
const iconsSrcPath = path.resolve( 'src/icons/solid/' );
const iconsJson = JSON.parse( fs.readFileSync( iconsJsonPath, 'utf-8') );

let dirty = false;

const svgIcons = fs.readdirSync(iconsSrcPath);
const svgIconsList = iconsJson.icons;

// Add new icons to json
svgIcons.forEach( svgIcon => {
    const svgIconName = path.parse(svgIcon).name;

    if (svgIconsList.find(icon => icon.name === svgIconName)) {
        return;
    }

    dirty = true;

    const maxUnicode = Math.max(...svgIconsList.map(icon => parseInt(icon.unicode, 16)));
    const iconUnicode = maxUnicode + 1;

    let newIcon = {
        name: svgIconName,
        ligatures: [],
        aliases: [],
        groups: [],
        unicode: iconUnicode.toString(16)
    };

    svgIconsList.push(newIcon);

    fs.writeFileSync( iconsJsonPath, JSON.stringify( iconsJson, null, 4 ));

    // eslint-disable-next-line no-console
    console.info( `${svgIconName} icon added to icons.json` );
});


// remove deleted icons from json
let updatedIconsJson = {};
svgIconsList.forEach( svgIconJson => {
    let iconPath = path.resolve( iconsSrcPath, `${svgIconJson.name}.svg` );

    if ( fs.existsSync( iconPath ) ) {
        return;
    }

    dirty = true;

    updatedIconsJson.icons = svgIconsList.filter(icon => icon.name !== svgIconJson.name);

    fs.writeFileSync( iconsJsonPath, JSON.stringify( updatedIconsJson, null, 4 ));

    // eslint-disable-next-line no-console
    console.info( `${svgIconJson.name} icon removed from icons.json` );
});

if ( dirty === false ) {
    // eslint-disable-next-line no-console
    console.info( `No icons needed update` );
}
