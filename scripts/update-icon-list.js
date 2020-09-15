const fs = require('fs-extra');
const path = require('path');

const iconsJsonPath = path.resolve( 'src/icons/icons.json' );
const iconListPath = path.resolve( 'src/icons/icons-list.json' );
const iconsJson = JSON.parse( fs.readFileSync( iconsJsonPath, 'utf-8') );

const unicodeStart = parseInt('e000', 16);
const iconsList = {
    list: [],
    emptyIndex: -1
};

iconsJson.icons.forEach( ( iconDef, index ) => {
    let unicodeDecimal = parseInt( iconDef.unicode, 16 ) - unicodeStart;
    iconsList.list[unicodeDecimal] = iconDef.name;

    if ( iconsList.emptyIndex === -1 && unicodeDecimal > index  ) {
        iconsList.emptyIndex = index;
    }
});

fs.writeFileSync( iconListPath, JSON.stringify( iconsList, null, 4 ) );
