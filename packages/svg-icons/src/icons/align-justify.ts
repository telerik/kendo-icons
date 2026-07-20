import { SVGIcon } from '../svg-icon.interface';

export const alignJustifyIcon: SVGIcon = {
    name: 'align-justify',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6h16.5M3.75 9.75h16.5M3.75 13.5h16.5m-16.5 3.75h16.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M19.4989 3.0032H4.499a1.5 1.5 0 0 0-1.5 1.5V19.503a1.5 1.5 0 0 0 1.5 1.5H19.499a1.5 1.5 0 0 0 1.5-1.5V4.5032a1.5 1.5 0 0 0-1.5-1.5m-1.5 14.2499H5.999a.7503.7503 0 0 1-.75-.75.7503.7503 0 0 1 .75-.75h11.9999a.75.75 0 1 1 0 1.5m0-3H5.999a.7498.7498 0 0 1-.5303-1.2803.75.75 0 0 1 .5303-.2197h11.9999a.7497.7497 0 0 1 .75.75.7497.7497 0 0 1-.75.75m0-3H5.999a.7498.7498 0 0 1-.5303-1.2803.75.75 0 0 1 .5303-.2197h11.9999a.7499.7499 0 1 1 0 1.5m0-3H5.999a.75.75 0 1 1 0-1.5h11.9999a.7499.7499 0 0 1 .5303 1.2804.75.75 0 0 1-.5303.2196"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6h16.5M3.75 9.75h16.5M3.75 13.5h16.5m-16.5 3.75h16.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M20.25 6H3.75v11.25h16.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6h16.5M3.75 9.75h16.5M3.75 13.5h16.5m-16.5 3.75h16.5" fill="none"/>'
    },
    tags: ['align', 'justify', 'text-formatting', 'position', 'arrange', 'layout']
}
