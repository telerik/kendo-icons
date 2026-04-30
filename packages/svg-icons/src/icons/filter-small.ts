import { SVGIcon } from '../svg-icon.interface';

/**
 * @deprecated since v4. Will be removed in v5. Use `filter` instead.
 */
export const filterSmallIcon: SVGIcon = {
    name: 'filter-small',
    content: '<path d="M128 128h256v32l-96 96v96l-64 64V256l-96-96z" />',
    viewBox: '0 0 512 512',
    tags: ["actions"],
    variants: {
        'solid': '',
        'outline': '',
        'duotone': ''
    }
}
