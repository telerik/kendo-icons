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

const ttfOptions = {
    description: 'Telerik and Kendo Icon Font',
    url: 'https://www.telerik.com/',
};

function buildFontJson() {
    iconsHast.icons.forEach( iconDef => {
        // Merge all foreground path d values into a single glyph path.
        // Skip paths with white/background fill (e.g. #fff, white)
        // as they represent cutouts that don't translate to font glyphs.
        const mergedD = iconDef.hast
            .filter( node => node.tagName === 'path' && node.properties && node.properties.d )
            .filter( node => {
                const fill = (node.properties.fill || '').toLowerCase();
                return fill !== '#fff' && fill !== '#ffffff' && fill !== 'white';
            })
            .map( node => node.properties.d )
            .join(' ');

        fontJson.glyphs.push({
            name: iconDef.name,
            ligatures: [],
            unicode: iconDef.unicode,
            d: mergedD
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
    const ttf = svg2ttf( fs.readFileSync( fontPaths.tmpSvg, 'utf8' ), ttfOptions );
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
        resolve( 'scss/_icon-list.scss' ),
        `@mixin kendo-icon-list {\n    ${fileContent.join( '\n    ' )}\n}\n`
    );

    fs.copyFileSync(
        fontPaths.tmpTtf,
        fontPaths.distTtf
    );

    fs.copyFileSync(
        fontPaths.tmpTtf,
        resolve( 'scss/kendo-font-icons.ttf' )
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
