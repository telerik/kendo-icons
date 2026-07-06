import { SVGIcon } from '../svg-icon.interface';

export const handleResizeAltIcon: SVGIcon = {
    name: 'handle-resize-alt',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12v7.5H12" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M19.5 12v7.5H12"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12v7.5H12z" fill="none"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12v7.5H12" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M19.5 12v7.5H12"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12v7.5H12" fill="none"/>'
    },
    tags: ['handle', 'resize', 'alt', 'css', 'editing', 'scale', 'expand', 'shrink']
}
