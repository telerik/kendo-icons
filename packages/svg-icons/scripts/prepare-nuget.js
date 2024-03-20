const fs = require('fs');
const { resolve } = require('path');

const _ = require('lodash');

const { paths } = require('../../../scripts/shared');
const { svgCsTemplate, indexCsTemplate } = require('./templates');

// Prepare clean
fs.rmSync( 'src-cs/Telerik.SvgIcons/Icons', { recursive: true, force: true } );
fs.mkdirSync( 'src-cs/Telerik.SvgIcons/Icons', { recursive: true } );

const iconsHast = JSON.parse( fs.readFileSync( paths.icons.hast, 'utf-8' ) );

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

        iconList.push({
            iconName: iconName,
            iconCsName: iconCsName
        });

        content = svgCsTemplate({
            iconName: iconName,
            iconCsName: iconCsName,
            iconSvgContent: iconSvgContent
        });

        fs.writeFileSync( filename, content );
    });

    fs.writeFileSync(
        'src-cs/Telerik.SvgIcons/SvgIcon.cs',
        indexCsTemplate( iconList )
    );
}

prepareNuget();
