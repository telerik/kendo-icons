import { SVGIcon } from '../svg-icon.interface';

export const handleResizeIcon: SVGIcon = {
    name: 'handle-resize',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12 12 19.5m6-15.75L3.75 18" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M18.7496 3.7535v14.2499a.7497.7497 0 0 1-.75.75H3.7497a.7501.7501 0 0 1-.5306-1.2806l14.2499-14.25a.7502.7502 0 0 1 1.1544.1137.75.75 0 0 1 .1262.417"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12 12 19.5m6-15.75L3.75 18" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M18 18V3.75L3.75 18z"/><path stroke-linecap="round" stroke-linejoin="round" d="M18 18V3.75L3.75 18z" fill="none"/>'
    },
    tags: ['handle', 'resize', 'css', 'editing', 'scale', 'expand', 'shrink']
}
