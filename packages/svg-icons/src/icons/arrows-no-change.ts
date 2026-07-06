import { SVGIcon } from '../svg-icon.interface';

export const arrowsNoChangeIcon: SVGIcon = {
    name: 'arrows-no-change',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="m12.75 14.25 4.5-4.5 4.5 4.5m-19.5-4.5 4.5 4.5 4.5-4.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="m12.75 14.2598 4.5-4.5 4.5 4.5M2.25 9.7598l4.5 4.5 4.5-4.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m12.75 14.2598 4.5-4.5 4.5 4.5zm-10.5-4.5 4.5 4.5 4.5-4.5z" fill="none"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="m12.75 14.25 4.5-4.5 4.5 4.5m-19.5-4.5 4.5 4.5 4.5-4.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="m11.25 9.75-4.5 4.5-4.5-4.5zM21.75 14.25h-9l4.5-4.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="m12.7502 14.25 4.5-4.5 4.5 4.5m-19.5-4.5 4.5 4.5 4.5-4.5" fill="none"/>'
    },
    tags: ['arrows', 'no', 'change', 'navigation']
}
