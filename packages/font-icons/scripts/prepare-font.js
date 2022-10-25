const fs = require('fs');
const { resolve } = require('path');
const svg2ttf = require('svg2ttf');

const { paths, prepareSvg, buildHast } = require('../../../scripts/shared');
const { svgFontTemplate, fontFileTemplate } = require('./templates');

const fontPaths = {
    tmpJson: resolve( '.tmp/font.json' ),
    tmpSvg: resolve( '.tmp/kendo-font-icons.svg' ),
    tmpTtf: resolve( '.tmp/kendo-font-icons.ttf' ),
    distTtf: resolve( 'dist/kendo-font-icons.ttf' )
};

// Prepare clean tmp and dist dirs
fs.rmSync( '.tmp', { recursive: true, force: true } );
fs.mkdirSync( '.tmp' );

fs.rmSync( 'dist', { recursive: true, force: true } );
fs.mkdirSync( 'dist' );

// Prepare svg
prepareSvg();

// Build hast from svg
buildHast();

const iconsHast = JSON.parse( fs.readFileSync( paths.icons.hast, 'utf-8' ) );
const fontJson = {
    fontName: 'WebComponentsIcons',
    glyphs: []
};


function buildFontJson() {
    iconsHast.icons.forEach( iconDef => {
        fontJson.glyphs.push({
            name: iconDef.name,
            ligatures: [],
            unicode: iconDef.unicode,
            d: iconDef.hast[0].properties.d
        });
    });

    fs.writeFileSync( fontPaths.tmpJson, JSON.stringify( fontJson, null, 4 ) );

    return Promise.resolve();
}


function buildSvgFont() {
    fs.writeFileSync( fontPaths.tmpSvg, svgFontTemplate( fontJson ) );

    return Promise.resolve();
}


function buildTtfFont() {
    const ttf = svg2ttf( fs.readFileSync( fontPaths.tmpSvg, 'utf8' ) );
    fs.writeFileSync( fontPaths.tmpTtf, new Buffer.from( ttf.buffer ) );

    return Promise.resolve();
}


function prepareFontIcons() {

    // Build json from hast
    buildFontJson();

    // Build svg font from json
    buildSvgFont();

    // Build ttf font from svg font
    buildTtfFont();

    const fileContent = [];

    iconsHast.icons.forEach( iconDef => {
        let iconName = iconDef.name;
        let aliases = iconDef.aliases;
        let unicode = iconDef.unicode;

        fileContent.push(`.k-i-${iconName}::before { content: "\\${unicode}"; } `);
        aliases.forEach( alias => fileContent.push(`.k-i-${alias}::before { content: "\\${unicode}"; } `) );
    });

    fs.writeFileSync(
        resolve( 'scss/_icons.scss' ),
        fileContent.join( '\n' )
    );

    fs.copyFileSync(
        fontPaths.tmpTtf,
        fontPaths.distTtf
    );

    fs.writeFileSync(
        resolve( 'scss/_font.scss' ),
        fontFileTemplate( fontPaths.distTtf )
    );

    fs.copyFileSync(
        paths.icons.list,
        resolve( 'dist/icon-list.json' )
    );

    fs.copyFileSync(
        paths.icons.json,
        resolve( 'dist/icons.json' )
    );

    return Promise.resolve();
}

prepareFontIcons();
