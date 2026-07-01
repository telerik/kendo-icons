const fs = require('fs');
const { resolve } = require('path');
const pkgRoot = resolve(__dirname, '..');
const svg2ttf = require('svg2ttf');
const svgpath = require('svgpath');
const { renderAsync } = require('@resvg/resvg-js');
const { loadFromCanvas } = require('potrace-wasm');

const { paths, prepareSvg, buildHast } = require('../../../scripts/shared');
const { svgFontTemplate, fontFileTemplate } = require('./templates');

const fontPaths = {
    tmpJson: resolve( pkgRoot, '.tmp/font.json' ),
    tmpSvg: resolve( pkgRoot, '.tmp/kendo-font-icons.svg' ),
    tmpTtf: resolve( pkgRoot, '.tmp/kendo-font-icons.ttf' ),
    distTtf: resolve( pkgRoot, 'dist/kendo-font-icons.ttf' )
};

// Prepare clean tmp and dist dirs
fs.rmSync( resolve( pkgRoot, '.tmp' ), { recursive: true, force: true } );
fs.mkdirSync( resolve( pkgRoot, '.tmp' ) );

fs.rmSync( resolve( pkgRoot, 'dist' ), { recursive: true, force: true } );
fs.mkdirSync( resolve( pkgRoot, 'dist' ) );

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

// Render resolution for the rasterize-then-trace pipeline.
// Higher = better curve fidelity, slower build. 192 is a good balance.
const RENDER_SIZE = 192;


// --- Render-and-trace icon pipeline (via potrace-wasm) ---

/**
 * Convert an SVG icon to a glyph path d string in SVG coordinate space (0–24).
 *
 * 1. Renders the SVG to an RGBA bitmap with @resvg/resvg-js.
 * 2. Traces with potrace-wasm (C potrace compiled to WebAssembly), which
 *    produces paths with correct nonzero-compatible winding (CW outer, CCW holes).
 * 3. Transforms the path coordinates from potrace space to the 0–24 SVG unit
 *    space expected by the font template.
 */
async function iconToGlyphPath( svgContent, size = RENDER_SIZE ) {
    // 1. Render the SVG to an RGBA bitmap (transparent background).
    const rendered = await renderAsync( svgContent, { fitTo: { mode: 'width', value: size } } );
    const { pixels, width, height } = rendered;

    // 2. Trace the RGBA bitmap using potrace-wasm.
    //    loadFromCanvas accepts a canvas-like object; we pass a lightweight shim
    //    so the RGBA pixel data flows directly to the WASM module.
    const canvasShim = {
        width,
        height,
        getContext: () => ( { getImageData: () => ( { data: pixels } ) } )
    };
    const potraceSvg = await loadFromCanvas( canvasShim );

    // 3. Collect ALL <path d="..."> attributes.
    //    potrace-wasm may emit multiple <path> elements for disconnected regions.
    //    Each element begins with an absolute M, so concatenation is safe.
    const dMatches = [ ...potraceSvg.matchAll( /\bd="([^"]+)"/g ) ];
    const allD = dMatches.map( m => m[ 1 ] ).join( ' ' );
    if ( !allD ) { return ''; }

    // 4. Convert potrace coordinates to 0–24 SVG space.
    //    potrace wraps its paths in: translate(0, height) scale(0.1, -0.1)
    //    Combined with pixel→SVG-unit scale (24/size):
    //      x_final = x_p * 0.1 * (24/size)  =  x_p * 24/(size*10)
    //      y_final = (size - y_p*0.1) * (24/size)  =  24 - y_p * 24/(size*10)
    const scale = 24 / ( size * 10 );
    return svgpath( allD )
        .scale( scale, -scale )
        .translate( 0, 24 )
        .toString();
}


async function buildFontJson() {
    // Process icons in batches to avoid overwhelming native threads and memory.
    // Each renderAsync + loadFromCanvas allocates a 192×192 RGBA buffer in native code;
    // spawning 800+ at once can crash the process or drain the event loop.
    const CONCURRENCY = 32;
    const glyphs = [];

    for ( let i = 0; i < iconsHast.icons.length; i += CONCURRENCY ) {
        const batch = iconsHast.icons.slice( i, i + CONCURRENCY );
        const results = await Promise.all(
            batch.map( async iconDef => {
                const svgFile = resolve( paths.icons.temp, iconDef.name + '.svg' );
                const svgContent = fs.readFileSync( svgFile, 'utf-8' );
                const d = await iconToGlyphPath( svgContent );
                return {
                    name: iconDef.name,
                    ligatures: [],
                    unicode: iconDef.unicode,
                    d
                };
            } )
        );
        glyphs.push( ...results );
    }

    fontJson.glyphs = glyphs;
    fs.writeFileSync( fontPaths.tmpJson, JSON.stringify( fontJson, null, 4 ) );
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


async function prepareFontIcons() {

    // Build glyph json from rendered+traced icons
    await buildFontJson();

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
        resolve( pkgRoot, 'scss/_icon-list.scss' ),
        `@mixin kendo-icon-list {\n    ${fileContent.join( '\n    ' )}\n}\n`
    );

    fs.copyFileSync(
        fontPaths.tmpTtf,
        fontPaths.distTtf
    );

    fs.copyFileSync(
        fontPaths.tmpTtf,
        resolve( pkgRoot, 'scss/kendo-font-icons.ttf' )
    );

    fs.writeFileSync(
        resolve( pkgRoot, 'scss/_font.scss' ),
        fontFileTemplate( fontPaths.distTtf )
    );

    fs.copyFileSync(
        paths.icons.list,
        resolve( pkgRoot, 'dist/icon-list.json' )
    );

    fs.copyFileSync(
        paths.icons.json,
        resolve( pkgRoot, 'dist/icons.json' )
    );
}
// Keep the event loop alive while async work runs — prevents premature exit
// if native async handles (resvg/potrace-wasm) momentarily drain the loop.
const keepAlive = setInterval( () => {}, 30000 );

// eslint-disable-next-line no-console
prepareFontIcons().then( () => {
    clearInterval( keepAlive );
} ).catch( err => {
    clearInterval( keepAlive );
    // eslint-disable-next-line no-console
    console.error( err );
    process.exit( 1 );
} );

