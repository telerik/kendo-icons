module.exports = {
    multipass: false,
    floatPrecision: 4,
    plugins: [
        'preset-default',
        {
            // Strip hardcoded stroke color and stroke-width from shape elements so that
            // CSS custom properties (stroke: currentColor, --kendo-icon-stroke-width)
            // take full control at runtime.
            //
            // stroke-linecap / stroke-linejoin are preserved — they affect appearance
            // (caps, joins) but not color or width.
            //
            // For stroke-only shapes (no fill), fill="none" is added first so paths
            // don\'t inherit fill: currentColor from the CSS rule on the parent <svg>.
            name: 'removePresentationStrokeAttrs',
            fn: () => ({
                element: {
                    enter( node ) {
                        const SHAPE_TAGS = new Set([ 'path', 'circle', 'rect', 'ellipse', 'polygon', 'polyline', 'line' ]);
                        if ( !SHAPE_TAGS.has( node.name ) ) { return; }

                        const hasStroke = node.attributes.stroke && node.attributes.stroke !== 'none';
                        const hasFill = 'fill' in node.attributes;

                        // Guard stroke-only shapes against inheriting fill: currentColor
                        if ( hasStroke && !hasFill ) {
                            node.attributes.fill = 'none';
                        }

                        // Strip color — CSS `stroke: currentColor` on the parent <svg> handles it
                        if ( hasStroke ) {
                            delete node.attributes.stroke;
                        }

                        // Strip width — controlled via --kendo-icon-stroke-width CSS var
                        delete node.attributes[ 'stroke-width' ];
                    }
                }
            })
        }
    ]
};

