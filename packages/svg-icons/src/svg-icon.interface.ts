/**
 * Defines an SVG Icon.
 */
export interface SVGIcon {
    /**
     * The unique name of the icon.
     */
    name: string;
    /**
     * The entire SVG content of the icon.
     */
    content: string;
    /**
     * The [viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)
     * definition that should be used for the icon.
     */
    viewBox: string;
}
