import { SVGIcon } from '../svg-icon.interface';

export const sharpenIcon: SVGIcon = {
    name: 'sharpen',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3 6.25 20.25h11.5z" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3 6.25 20.25h11.5z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3 6.25 20.25h11.5z" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 3 6.25 20.25h11.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 6.25 20.25h11.5z" fill="none"/>'
    },
    tags: ['sharpen', 'images']
}
