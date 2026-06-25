const fs = require('fs');
const { resolve } = require('path');
const { spawn, spawnSync } = require('child_process');
const pkgRoot = resolve(__dirname, '..');
const svg2ttf = require('svg2ttf');
const svgpath = require('svgpath');
const { renderAsync } = require('@resvg/resvg-js');

// Fail fast with a helpful message if potrace is not installed.
// macOS: brew install potrace  |  Debian/Ubuntu: apt-get install potrace
if ( spawnSync( 'potrace', [ '--version' ], { stdio: 'ignore' } ).error ) {
    // eslint-disable-next-line no-console
    console.error( [
        '',
        '  potrace is required to build the font icons but was not found.',
        '  Install it and re-run:',
        '    macOS:          brew install potrace',
        '    Debian/Ubuntu:  sudo apt-get install -y potrace',
        '',
    ].join( '\n' ) );
    process.exit( 1 );
}

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


// --- Render-and-trace icon pipeline (via potrace) ---

/**
 * Pipe a binary PBM buffer to potrace and return its SVG output.
 * potrace outputs paths with correct nonzero-compatible winding:
 * outer boundaries are clockwise (in Y-down SVG) and holes are counter-clockwise.
 */
function runPotrace( pbmBuffer ) {
    return new Promise( ( resolve, reject ) => {
        const child = spawn( 'potrace', [ '-s', '--flat', '-', '-o', '-' ] );
        const chunks = [];
        child.stdout.on( 'data', chunk => chunks.push( chunk ) );
        child.on( 'close', code => {
            if ( code !== 0 ) {
                reject( new Error( 'potrace exited with code ' + code ) );
            } else {
                resolve( Buffer.concat( chunks ).toString( 'utf-8' ) );
            }
        } );
        child.on( 'error', reject );
        child.stdin.write( pbmBuffer );
        child.stdin.end();
    } );
}

/**
 * Convert an SVG icon to a glyph path d string in SVG coordinate space (0–24).
 *
 * 1. Renders the SVG to an RGBA bitmap with @resvg/resvg-js.
 * 2. Thresholds to a 1-bit PBM bitmap.
 * 3. Traces with potrace, which produces a single compound path whose subpaths
 *    already have correct nonzero winding (CW outer, CCW holes).
 * 4. Transforms the path coordinates from potrace space to the 0–24 SVG unit
 *    space expected by the font template.
 */
async function iconToGlyphPath( svgContent, size = RENDER_SIZE ) {
    // 1. Render the SVG to an RGBA bitmap (transparent background).
    const rendered = await renderAsync( svgContent, { fitTo: { mode: 'width', value: size } } );
    const { pixels, width, height } = rendered;

    // 2. Build a binary PBM (P4) bitmap.
    //    A pixel is black if, when alpha-composited onto white, its red channel < 128.
    const header = Buffer.from( 'P4\n' + width + ' ' + height + '\n' );
    const bytesPerRow = Math.ceil( width / 8 );
    const data = Buffer.alloc( bytesPerRow * height, 0 );
    for ( let y = 0; y < height; y++ ) {
        for ( let x = 0; x < width; x++ ) {
            const i = ( y * width + x ) * 4;
            const a = pixels[ i + 3 ] / 255;
            const r = Math.round( pixels[ i ] * a + 255 * ( 1 - a ) );
            if ( r < 128 ) {
                const byte = Math.floor( x / 8 );
                const bit = 7 - ( x % 8 );
                data[ y * bytesPerRow + byte ] |= ( 1 << bit );
            }
        }
    }
    const pbmBuffer = Buffer.concat( [ header, data ] );

    // 3. Trace the bitmap with potrace.
    const potraceSvg = await runPotrace( pbmBuffer );

    // 4. Extract the path d attribute.
    //    potrace outputs a single <path> element (--flat merges disconnected regions).
    const match = potraceSvg.match( /\bd="([^"]+)"/ );
    if ( !match ) { return ''; }

    // 5. Convert potrace coordinates to 0–24 SVG space.
    //    potrace wraps its path in: translate(0, height) scale(0.1, -0.1)
    //    Combined with pixel→SVG-unit scale (24/size):
    //      x_final = x_p * 0.1 * (24/size)  =  x_p * 24/(size*10)
    //      y_final = (size - y_p*0.1) * (24/size)  =  24 - y_p * 24/(size*10)
    const scale = 24 / ( size * 10 );
    return svgpath( match[ 1 ] )
        .scale( scale, -scale )
        .translate( 0, 24 )
        .toString();
}


async function buildFontJson() {
    // Process all icons in parallel for speed.
    const glyphs = await Promise.all(
        iconsHast.icons.map( async iconDef => {
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
// eslint-disable-next-line no-console
prepareFontIcons().catch( err => { console.error( err ); process.exit( 1 ); } );

