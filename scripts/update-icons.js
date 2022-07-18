const fs = require('fs-extra');
const path = require('path');

const unicodeStart = parseInt('e000', 16);

function updateIcons() {
    const iconSrcPath = path.resolve( 'src/icons/solid/' );
    const svgIcons = fs.readdirSync(iconSrcPath);

    const iconsJsonPath = path.resolve( 'src/icons/icons.json' );
    const iconListPath = path.resolve( 'src/icons/icon-list.json' );

    let iconsJson = JSON.parse( fs.readFileSync( iconsJsonPath, 'utf-8' ) );
    let iconList = JSON.parse( fs.readFileSync( iconListPath, 'utf-8' ) );

    let dirty = false;

    // Add new icons to json
    svgIcons.forEach( svgIcon => {
        const svgIconName = path.parse( svgIcon ).name;

        if ( iconList.indexOf(svgIconName) > - 1 ) {
            return;
        }

        dirty = true;

        let emptyIndex = iconList.indexOf( null );

        if ( emptyIndex === -1 ) {
            emptyIndex = iconList.length;
        }

        let newIcon = {
            name: svgIconName,
            ligatures: [],
            aliases: [],
            groups: [],
            unicode: (unicodeStart + emptyIndex).toString(16)
        };

        iconList[emptyIndex] = svgIconName;
        iconsJson.push( newIcon );

        // eslint-disable-next-line no-console
        console.info( `${svgIconName} icon added to icons.json and icons-list.json` );
    });


    // Sort icons
    iconsJson = iconsJson.sort( (curr, next) => parseInt(curr.unicode, 16) - parseInt(next.unicode, 16) );


    // remove deleted icons from json
    iconsJson = iconsJson.filter( svgIconJson => {
        let iconPath = path.resolve( iconSrcPath, `${svgIconJson.name}.svg` );

        if ( fs.existsSync(iconPath) ) {
            return true;
        }

        dirty = true;

        // eslint-disable-next-line no-console
        console.info( `${svgIconJson.name} icon removed from icons.json and icons-list.json` );

        return false;
    });


    iconList = [];
    iconsJson.forEach( icon => {
        let index = parseInt( icon.unicode, 16 ) - unicodeStart;
        iconList[index] = icon.name;
    });


    fs.writeFileSync( iconListPath, JSON.stringify(iconList, null, 4) );
    fs.writeFileSync( iconsJsonPath, JSON.stringify(iconsJson, null, 4) );


    if ( dirty === false ) {
        // eslint-disable-next-line no-console
        console.info( `No icons needed update` );
    }

}

updateIcons();
