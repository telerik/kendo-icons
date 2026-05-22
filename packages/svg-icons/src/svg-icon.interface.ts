/**
 * Defines a variant of an SVG Icon (e.g. outline, duotone).
 * An empty string means the variant exists but has no SVG yet.
 */
export type SVGIconVariant = string;

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
    /**
     * Style variants of the icon (e.g. outline, duotone),
     * keyed by variant name.
     */
    variants?: Record<string, SVGIconVariant>;
}
