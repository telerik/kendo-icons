/**
 * Builds the `legacy` icon variant from the v4 SVGs in `v4-icons/`.
 *
 * Each v4 icon (512x512) is rescaled to the 24x24 viewBox used by all variants
 * and written to `src/telerik-icons/legacy/<name>.svg`. An icon whose v4 name still
 * exists in icons.json maps to itself; removed v4 icons are mapped to their v5
 * replacement via deprecated-icons.json. When several removed icons share a
 * replacement, the `outline` one wins (it matches the default icon content).
 *
 * Usage: npm run import-legacy
 */
const fs = require('fs');
const path = require('path');
const svgpath = require('svgpath');
const svgParser = require('svg-parser');

const root = path.resolve( __dirname, '..' );
const srcDir = path.resolve( root, 'v4-icons' );
const outDir = path.resolve( root, 'src/telerik-icons/legacy' );
const iconsJsonPath = path.resolve( root, 'src/telerik-icons/icons.json' );
const deprecatedPath = path.resolve( root, 'v4-v5-migration-assets/deprecated-icons.json' );

const TARGET_SIZE = 24;
const PRECISION = 4;
const KEPT_ATTRS = [ 'fill-rule', 'clip-rule' ];

function findPaths( node, result = [] ) {
    if ( node.tagName === 'path' ) {
        result.push( node.properties );
    }

    ( node.children || [] ).forEach( child => findPaths( child, result ) );

    return result;
}

function scalePath( props, sourceSize ) {
    const factor = TARGET_SIZE / sourceSize;
    const d = svgpath( props.d ).scale( factor ).round( PRECISION ).toString();
    const extra = KEPT_ATTRS.filter( attr => props[ attr ] ).map( attr => ` ${attr}="${props[ attr ]}"` ).join('');

    return `<path d="${d}"${extra}/>`;
}

function convertIcon( svgContent ) {
    const svg = svgParser.parse( svgContent ).children[0];
    const [ , , width, height ] = ( svg.properties.viewBox || `0 0 ${svg.properties.width} ${svg.properties.height}` )
        .split( /\s+/ ).map( Number );

    if ( width !== height ) {
        throw new Error( `non-square viewBox ${width}x${height}` );
    }

    const paths = findPaths( svg ).filter( p => p.d );

    if ( !paths.length ) {
        throw new Error( 'no <path> found' );
    }

    const body = paths.map( p => scalePath( p, width ) ).join('\n');

    return `<svg width="${TARGET_SIZE}" height="${TARGET_SIZE}" viewBox="0 0 ${TARGET_SIZE} ${TARGET_SIZE}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${body}\n</svg>\n`;
}

// Lower is better: outline > other > solid, then the shorter name.
function rank( name ) {
    let group = 1;

    if ( name.includes( 'outline' ) ) {
        group = 0;
    } else if ( name.includes( 'solid' ) ) {
        group = 2;
    }

    return group * 1000 + name.length;
}

// Returns Map<v5 icon name, v4 icon name>.
function resolveSources( v4Names, iconNames, deprecated ) {
    const sources = new Map();
    const skipped = [];

    v4Names.filter( n => iconNames.has( n ) ).forEach( n => sources.set( n, n ) );

    const candidates = new Map();

    v4Names.filter( n => !iconNames.has( n ) ).forEach( n => {
        const target = deprecated[ n ];

        if ( !target || !iconNames.has( target ) || sources.has( target ) ) {
            skipped.push( n );
            return;
        }

        candidates.set( target, [ ...( candidates.get( target ) || [] ), n ] );
    });

    candidates.forEach( ( names, target ) => {
        names.sort( ( a, b ) => rank( a ) - rank( b ) );
        sources.set( target, names[0] );
        skipped.push( ...names.slice( 1 ) );
    });

    return { sources, skipped };
}

function importLegacyIcons() {
    const iconNames = new Set( JSON.parse( fs.readFileSync( iconsJsonPath, 'utf-8' ) ).map( i => i.name ) );
    const deprecated = JSON.parse( fs.readFileSync( deprecatedPath, 'utf-8' ) );
    const v4Names = fs.readdirSync( srcDir ).filter( f => path.extname( f ) === '.svg' ).map( f => path.parse( f ).name );
    const { sources, skipped } = resolveSources( v4Names, iconNames, deprecated );
    let written = 0;

    fs.rmSync( outDir, { recursive: true, force: true } );
    fs.mkdirSync( outDir, { recursive: true } );

    sources.forEach( ( v4Name, name ) => {
        try {
            const converted = convertIcon( fs.readFileSync( path.resolve( srcDir, `${v4Name}.svg` ), 'utf-8' ) );

            fs.writeFileSync( path.resolve( outDir, `${name}.svg` ), converted );
            written++;

            if ( name !== v4Name ) {
                // eslint-disable-next-line no-console
                console.info( `  mapped ${v4Name} -> ${name}` );
            }
        } catch ( err ) {
            throw new Error( `${v4Name}.svg: ${err.message}`, { cause: err } );
        }
    });

    // eslint-disable-next-line no-console
    console.info( `Legacy variant: ${written} icons written to ${path.relative( root, outDir )}` );

    if ( skipped.length ) {
        // eslint-disable-next-line no-console
        console.info( `Skipped ${skipped.length} v4 icons with no v5 target or superseded by another:\n  ${skipped.join( '\n  ' )}` );
    }
}

importLegacyIcons();
