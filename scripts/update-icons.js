const fs = require('fs-extra');
const path = require('path');

const iconsJsonPath = path.resolve( 'src/icons/icons.json' );
const iconListPath = path.resolve( 'src/icons/icons-list.json' );
const iconsSrcPath = path.resolve( 'src/icons/solid/' );
const iconsJson = JSON.parse( fs.readFileSync( iconsJsonPath, 'utf-8') );
const iconsListJson = JSON.parse( fs.readFileSync( iconListPath, 'utf-8') );

let dirty = false;

const svgIcons = fs.readdirSync(iconsSrcPath);
const svgIconsList = iconsJson.icons;
const iconsList = iconsListJson.list;

// Add new icons to json
svgIcons.forEach( svgIcon => {
    const svgIconName = path.parse(svgIcon).name;

    if (svgIconsList.find(icon => icon.name === svgIconName)) {
        return;
    }

    dirty = true;

    const unicodeStart = parseInt('e000', 16);
    const unicodeNull = iconsList.findIndex(index => index == null);
    let iconUnicodeIndex;

    if (unicodeNull) {
        iconUnicodeIndex = unicodeNull;
    } else {
        iconUnicodeIndex = iconsList.length;
    }

    // Update icon-list.json
    iconsList[iconUnicodeIndex] = svgIconName;
    fs.writeFileSync( iconListPath, JSON.stringify( iconsListJson, null, 4 ) );

    const iconUnicode = unicodeStart + iconUnicodeIndex;
    let newIcon = {
        name: svgIconName,
        ligatures: [],
        aliases: [],
        groups: [],
        unicode: iconUnicode.toString(16)
    };

    // Update icons.json
    svgIconsList.push(newIcon);

    fs.writeFileSync( iconsJsonPath, JSON.stringify( iconsJson, null, 4 ));

    // eslint-disable-next-line no-console
    console.info( `${svgIconName} icon added to icons.json and icons-list.json` );
});


// remove deleted icons from json
let updatedIconsJson = {};
svgIconsList.forEach( svgIconJson => {
    let iconPath = path.resolve( iconsSrcPath, `${svgIconJson.name}.svg` );

    if ( fs.existsSync( iconPath ) ) {
        return;
    }

    dirty = true;

    // Delete icon from icons.json
    updatedIconsJson.icons = svgIconsList.filter(icon => icon.name !== svgIconJson.name);

    fs.writeFileSync( iconsJsonPath, JSON.stringify( updatedIconsJson, null, 4 ));


    // Delete icon from icons-list.json
    const delIconIndex = iconsList.indexOf(svgIconJson.name);

    if (delIconIndex !== -1) {
        iconsList[delIconIndex] = null;
    }

    fs.writeFileSync( iconListPath, JSON.stringify( iconsListJson, null, 4 ) );


    // eslint-disable-next-line no-console
    console.info( `${svgIconJson.name} icon removed from icons.json and icons-list.json` );
});

if ( dirty === false ) {
    // eslint-disable-next-line no-console
    console.info( `No icons needed update` );
}
