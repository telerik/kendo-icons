import { SVGIcon } from '../svg-icon.interface';

export const sharpenIcon: SVGIcon = {
    name: 'sharpen',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3 6.25 20.25h11.5z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3 6.25 20.25h11.5z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3 6.25 20.25h11.5z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 3 6.25 20.25h11.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 6.25 20.25h11.5z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>'
    },
    tags: ['sharpen', 'images']
}
