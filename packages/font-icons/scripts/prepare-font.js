const fs = require('fs');
const { resolve } = require('path');
const svg2ttf = require('svg2ttf');
const svgpath = require('svgpath');
const outline = require('svg-path-outline');

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

function collectPaths( nodes ) {
    const result = [];
    nodes.forEach( node => {
        if ( node.tagName === 'path' && node.properties && node.properties.d ) {
            const fill = (node.properties.fill || '').toLowerCase();
            if ( fill !== '#fff' && fill !== '#ffffff' && fill !== 'white' ) {
                result.push( node );
            }
        }
        if ( node.tagName === 'g' && node.children ) {
            result.push( ...collectPaths( node.children ) );
        }
    });
    return result;
}


// --- Stroke-to-fill expansion ---

/**
 * Detects if a path node is stroke-only (has stroke but no fill).
 * Font glyphs are always filled — stroke-only paths produce invisible hairlines.
 */
function isStrokeOnlyPath(node) {
    const fill = (node.properties.fill || '').toLowerCase();
    const stroke = node.properties.stroke;
    const strokeWidth = parseFloat(node.properties['stroke-width'] || '0');
    return (fill === 'none' || fill === '') && stroke && stroke !== 'none' && strokeWidth > 0;
}

/**
 * Converts a stroke-only path centerline into a filled outline path
 * using svg-path-outline + makerjs. Arcs are converted to cubic curves
 * for font-glyph compatibility.
 */
function strokeToFill(node) {
    const d = node.properties.d;
    const strokeWidth = parseFloat(node.properties['stroke-width'] || '1');
    const halfW = strokeWidth / 2;

    // Convert to absolute and ensure each point gets its own explicit command
    // (makerjs doesn't handle implicit L continuations like "L x1 y1 x2 y2")
    let explicitD = '';
    svgpath(d).abs().unshort().iterate(function(seg) {
        const cmd = seg[0];
        if (cmd === 'M') {
            explicitD += `M ${seg[1]} ${seg[2]} `;
        } else if (cmd === 'L') {
            explicitD += `L ${seg[1]} ${seg[2]} `;
        } else if (cmd === 'C') {
            explicitD += `C ${seg[1]} ${seg[2]} ${seg[3]} ${seg[4]} ${seg[5]} ${seg[6]} `;
        } else if (cmd === 'Q') {
            explicitD += `Q ${seg[1]} ${seg[2]} ${seg[3]} ${seg[4]} `;
        } else if (cmd === 'Z') {
            explicitD += 'Z ';
        }
    });
    explicitD = explicitD.trim();

    // outline(pathData, offsetDistance, options) — joints: 0=miter
    const expanded = outline(explicitD, halfW, { inside: true, outside: true, joints: 0 });

    if (!expanded) {
        return d;
    }

    // Convert arcs to cubic curves (font glyphs only support M, L, C, Q, Z)
    return svgpath(expanded).unarc().toString();
}


// --- Evenodd-to-nonzero winding conversion utilities ---

/**
 * Split a path d string into individual subpaths (each starting with M).
 * The d string must already be in absolute coordinates.
 */
function splitSubpaths( d ) {
    const parts = [];
    // Split on M commands, keeping the M
    const re = /M[^M]*/g;
    let match;
    while ( (match = re.exec(d)) !== null ) {
        parts.push( match[0].trim() );
    }
    return parts;
}

/**
 * Flatten a subpath d string into an array of [x, y] points.
 * Uses svgpath to iterate over all segments and extract endpoints.
 */
function subpathToPoints( d ) {
    const points = [];
    let curX = 0, curY = 0;
    svgpath(d).abs().unshort().iterate( function( segment ) {
        const cmd = segment[0];
        switch (cmd) {
            case 'M':
            case 'L':
                curX = segment[1]; curY = segment[2];
                points.push([ curX, curY ]);
                break;
            case 'H':
                curX = segment[1];
                points.push([ curX, curY ]);
                break;
            case 'V':
                curY = segment[1];
                points.push([ curX, curY ]);
                break;
            case 'C':
                curX = segment[5]; curY = segment[6];
                points.push([ curX, curY ]);
                break;
            case 'S':
                curX = segment[3]; curY = segment[4];
                points.push([ curX, curY ]);
                break;
            case 'Q':
                curX = segment[3]; curY = segment[4];
                points.push([ curX, curY ]);
                break;
            case 'T':
                curX = segment[1]; curY = segment[2];
                points.push([ curX, curY ]);
                break;
            case 'A':
                curX = segment[6]; curY = segment[7];
                points.push([ curX, curY ]);
                break;
            case 'Z':
            case 'z':
                break;
            default:
                break;
        }
    });
    return points;
}

/**
 * Compute the signed area of a polygon defined by points.
 * Positive = clockwise in SVG coords (Y-down), negative = counter-clockwise.
 */
function signedArea( points ) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length;
        area += points[i][0] * points[j][1];
        area -= points[j][0] * points[i][1];
    }
    return area / 2;
}

/**
 * Get the bounding box of a set of points.
 */
function getBBox( points ) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    points.forEach( p => {
        if (p[0] < minX) { minX = p[0]; }
        if (p[1] < minY) { minY = p[1]; }
        if (p[0] > maxX) { maxX = p[0]; }
        if (p[1] > maxY) { maxY = p[1]; }
    });
    return { minX, minY, maxX, maxY };
}

/**
 * Check if bbox A fully contains bbox B.
 */
function bboxContains( a, b ) {
    return a.minX <= b.minX && a.minY <= b.minY && a.maxX >= b.maxX && a.maxY >= b.maxY;
}

/**
 * Reverse a subpath's winding direction using svgpath.
 */
function reverseSubpath( d ) {
    const segments = [];
    svgpath(d).abs().unshort().iterate( function( segment ) {
        segments.push( segment.slice() );
    });

    if (segments.length < 2) {
        return d;
    }

    // Build the reversed path
    // Extract all points and reconstruct in reverse order with L commands
    const pts = subpathToPoints(d);
    if (pts.length < 2) {
        return d;
    }

    const hasClose = segments[segments.length - 1][0] === 'Z' || segments[segments.length - 1][0] === 'z';
    const reversed = [ 'M' + pts[pts.length - 1][0] + ' ' + pts[pts.length - 1][1] ];
    for (let i = pts.length - 2; i >= 0; i--) {
        reversed.push('L' + pts[i][0] + ' ' + pts[i][1]);
    }
    if (hasClose) {
        reversed.push('Z');
    }

    return reversed.join(' ');
}

/**
 * Convert an evenodd compound path to work with non-zero winding rule.
 * Determines nesting depth of subpaths and ensures alternating winding directions.
 */
function evenoddToNonzero( d ) {
    const subpaths = splitSubpaths(d);
    if (subpaths.length <= 1) {
        return d;
    }

    // Get points, signed areas, and bboxes for each subpath
    const infos = subpaths.map( sp => {
        const pts = subpathToPoints(sp);
        return {
            d: sp,
            points: pts,
            area: signedArea(pts),
            bbox: getBBox(pts)
        };
    });

    // Determine nesting depth of each subpath using bbox containment
    const depths = infos.map( (info, i) => {
        let depth = 0;
        infos.forEach( (other, j) => {
            if (i !== j && bboxContains(other.bbox, info.bbox)) {
                depth++;
            }
        });
        return depth;
    });

    // For non-zero winding: even depth = clockwise (positive area in SVG),
    // odd depth = counter-clockwise (negative area).
    const result = infos.map( (info, i) => {
        const isEvenDepth = depths[i] % 2 === 0;
        const isClockwise = info.area > 0;

        if (isEvenDepth && !isClockwise) {
            return reverseSubpath(info.d);
        } else if (!isEvenDepth && isClockwise) {
            return reverseSubpath(info.d);
        }
        return info.d;
    });

    return result.join(' ');
}


function buildFontJson() {
    iconsHast.icons.forEach( iconDef => {
        // Merge all foreground path d values into a single glyph path.
        // Skip paths with white/background fill (e.g. #fff, white)
        // as they represent cutouts that don't translate to font glyphs.
        // Recurse into <g> elements to find nested paths.
        const pathNodes = collectPaths( iconDef.hast );

        const mergedD = pathNodes
            .map( node => {
                let d;
                if (isStrokeOnlyPath(node)) {
                    d = strokeToFill(node);
                } else {
                    d = svgpath(node.properties.d).abs().toString();
                }
                // Convert evenodd paths to non-zero winding for font glyph compatibility
                if (node.properties['fill-rule'] === 'evenodd') {
                    d = evenoddToNonzero(d);
                }
                return d;
            })
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
