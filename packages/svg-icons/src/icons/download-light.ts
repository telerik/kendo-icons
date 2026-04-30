import { SVGIcon } from '../svg-icon.interface';

/**
 * @deprecated since v4. Will be removed in v5. Use `download` instead.
 */
export const downloadLightIcon: SVGIcon = {
    name: 'download-light',
    content: '<path d="M368 256 256 384 144 256h96V32h32v224zm112 192H32v32h448z" />',
    viewBox: '0 0 512 512',
    tags: ["actions"],
    variants: {
        'solid': '',
        'outline': '',
        'duotone': ''
    }
}
