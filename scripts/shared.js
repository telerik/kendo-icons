const fs = require('fs');
const { resolve, basename } = require('path');
const { globSync } = require('glob');
const { optimize } = require('svgo');
const svgParser = require('svg-parser');

const root = resolve(__dirname, '..');

const paths = {
    icons: {
        src: resolve( root, 'src/telerik-icons/outline' ),
        temp: resolve( root, '.tmp/icons/outline' ),
        json: resolve( root, 'src/telerik-icons/icons.json' ),
        list: resolve( root, 'src/telerik-icons/icon-list.json' ),
        hast: resolve( root, '.tmp/icons/icons-hast.json' ),
        aliases: resolve( root, 'src/telerik-icons/aliases.json' )
    },
    variants: {
        solid: {
            src: resolve( root, 'src/telerik-icons/solid' ),
            temp: resolve( root, '.tmp/icons/solid' )
        },
        outline: {
            src: resolve( root, 'src/telerik-icons/outline' ),
            temp: resolve( root, '.tmp/icons/outline' )
        },
        duotone: {
            src: resolve( root, 'src/telerik-icons/duotone' ),
            temp: resolve( root, '.tmp/icons/duotone' )
        }
    },
    svgGlob: '**/*.svg'
};

function prepareSvg() {
    let files = globSync( resolve( paths.icons.src, paths.svgGlob ), { windowsPathsNoEscape: true } );

    fs.rmSync( paths.icons.temp, { force: true, recursive: true } );
    fs.mkdirSync( paths.icons.temp, { recursive: true } );

    files.forEach( file => {
        let svgPath = fs.readFileSync( file, 'utf-8' );

        svgPath = optimize( svgPath ).data;

        fs.writeFileSync( resolve( paths.icons.temp, basename( file ) ), svgPath );
    });

    // Prepare variant SVGs (outline, duotone — solid is already prepared above)
    Object.entries( paths.variants ).forEach( ([ , variant ]) => {
        // Skip variants whose temp dir is handled by the base icon pipeline
        if ( variant.temp === paths.icons.temp ) {
            return;
        }

        fs.rmSync( variant.temp, { force: true, recursive: true } );

        if ( !fs.existsSync( variant.src ) ) {
            return;
        }

        let variantFiles = globSync( resolve( variant.src, paths.svgGlob ), { windowsPathsNoEscape: true } );

        if ( variantFiles.length === 0 ) {
            return;
        }

        fs.mkdirSync( variant.temp, { recursive: true } );

        variantFiles.forEach( file => {
            let svgContent = fs.readFileSync( file, 'utf-8' );

            svgContent = optimize( svgContent ).data;

            fs.writeFileSync( resolve( variant.temp, basename( file ) ), svgContent );
        });
    });

    return Promise.resolve();
}
prepareSvg.displayName = 'svg:prepare';


/**
 * Serialize a HAST node to an SVG markup string.
 * Strips `fill="black"` and `fill="none"` since consumers control fill via CSS.
 * Preserves all other attributes (opacity, fill-opacity, d, etc.).
 */
function hastNodeToSvg( node ) {
    const tag = node.tagName;
    const props = node.properties || {};

    const attrs = Object.entries( props )
        .filter( ([ key, val ]) => {
            // Strip fill="black"/"none"/"#000"/"#000000" — consumers control fill
            if ( key === 'fill' && ( val === 'black' || val === 'none' || val === '#000' || val === '#000000' ) ) {
                return false;
            }
            return true;
        })
        .map( ([ key, val ]) => `${key}="${val}"` )
        .join(' ');

    const open = attrs ? `<${tag} ${attrs}` : `<${tag}`;

    if ( !node.children || node.children.length === 0 ) {
        return `${open}/>`;
    }

    const inner = node.children.map( hastNodeToSvg ).join('');
    return `${open}>${inner}</${tag}>`;
}

/**
 * Serialize an array of HAST children into a single SVG content string.
 */
function hastToSvg( children ) {
    return children.map( hastNodeToSvg ).join('');
}


function buildHast() {
    const output = { icons: [] };
    const iconsJson = JSON.parse( fs.readFileSync( paths.icons.json, 'utf-8') );

    iconsJson.forEach( iconDef => {
        let iconName = iconDef.name;
        let iconFile = resolve( paths.icons.temp, `${iconName}.svg` );

        // Skip files which are missing from file system
        if ( fs.existsSync( iconFile ) === false ) {
            return;
        }

        let content = fs.readFileSync( iconFile, 'utf-8' );
        let parsed = svgParser.parse( content );

        // Collect variant data
        let variantHast = {};
        Object.entries( paths.variants ).forEach( ([ variantName, variant ]) => {
            let variantFile = resolve( variant.temp, `${iconName}.svg` );

            if ( !fs.existsSync( variantFile ) ) {
                return;
            }

            let variantContent = fs.readFileSync( variantFile, 'utf-8' );
            let variantParsed = svgParser.parse( variantContent );
            let svgNode = variantParsed.children[0];

            variantHast[ variantName ] = {
                hast: svgNode.children,
                svgContent: hastToSvg( svgNode.children )
            };
        });

        let iconEntry = {
            ...iconDef,
            hast: parsed.children[0].children,
            svgContent: hastToSvg( parsed.children[0].children )
        };

        if ( Object.keys( variantHast ).length ) {
            iconEntry.variantHast = variantHast;
        }

        output.icons.push( iconEntry );
    });

    fs.writeFileSync(paths.icons.hast, JSON.stringify(output, null, 4));

    return Promise.resolve();
}
buildHast.displayName = 'build:hast';


module.exports.paths = paths;
module.exports.prepareSvg = prepareSvg;
module.exports.buildHast = buildHast;
module.exports.hastToSvg = hastToSvg;
