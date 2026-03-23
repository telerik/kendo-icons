/**
 * SVGO config factory for Kendo-styled fill-based icon variants.
 *
 * All Phosphor weights are fill-based, so this single config handles all three.
 * mergePaths is only safe for solid (single-path silhouette). It MUST NOT be
 * used for duotone (destroys opacity layers) or outline (preserves structure).
 *
 * Kendo-specific: preserves stroke-linejoin, stroke-linecap, stroke-miterlimit,
 * stroke, and stroke-width attributes added by kendoify for the Kendo Signature
 * (miter joins, endpoint overshoot, corner softening).
 *
 * @param {'outline'|'solid'|'duotone'} variant
 */
function getSvgoConfig(variant = 'solid') {
    const plugins = [
        'cleanupAttrs',
        'cleanupEnableBackground',
        'cleanupIds',
        'cleanupNumericValues',
        'collapseGroups',
        'convertColors',
        'convertPathData',
        'convertTransform',
        // NOT convertShapeToPath — preserve readability
        'convertStyleToAttrs',
        'minifyStyles',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeTitle',
        'removeDesc',
        'removeUselessDefs',
        'removeEditorsNSData',
        'removeEmptyAttrs',
        'removeHiddenElems',
        'removeEmptyText',
        'removeEmptyContainers',
        'removeUnknownsAndDefaults',
        'removeNonInheritableGroupAttrs',
        // NOT removeUselessStrokeAndFill — kendoify adds intentional strokes
        // for corner softening on outline variant
        'removeUnusedNS',
        'removeRasterImages',
        'removeDimensions',
        {
            name: 'removeAttrs',
            params: {
                // Strip data attributes, clip paths, classes, IDs
                // but keep stroke-related attrs added by kendoify
                attrs: '(base.*|data.*|clip.*|overflow|class|id)'
            }
        },
        'removeElementsByAttr',
        'removeStyleElement',
        'removeScripts',
        'sortAttrs',
    ];

    // mergePaths only for solid — single-path fill icons
    // NOT for duotone (destroys opacity layers) or outline (preserve structure)
    if (variant === 'solid') {
        plugins.push('mergePaths');
    }

    return {
        multipass: true,
        floatPrecision: 3,
        js2svg: {
            pretty: true,
            indent: 2,
        },
        plugins,
    };
}

module.exports = { getSvgoConfig };
