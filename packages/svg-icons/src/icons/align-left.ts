import { SVGIcon } from '../svg-icon.interface';

export const alignLeftIcon: SVGIcon = {
    name: 'align-left',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6H3.75m12 3.75h-12m16.5 3.75H3.75m12 3.75h-12" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.1 2.28H3.9A1.62 1.62 0 0 0 2.28 3.9v16.2a1.62 1.62 0 0 0 1.62 1.62h16.2a1.62 1.62 0 0 0 1.62-1.62V3.9a1.62 1.62 0 0 0-1.62-1.62m-4.86 15.39H5.52a.81.81 0 0 1 0-1.62h9.72a.81.81 0 0 1 0 1.62m3.24-3.24H5.52a.81.81 0 0 1 0-1.62h12.96a.81.81 0 0 1 0 1.62M4.71 10.38a.81.81 0 0 1 .81-.81h9.72a.81.81 0 0 1 0 1.62H5.52a.81.81 0 0 1-.81-.81m13.77-2.43H5.52a.81.81 0 0 1 0-1.62h12.96a.81.81 0 0 1 0 1.62"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6H3.75m12 3.75h-12m16.5 3.75H3.75m12 3.75h-12" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M3.75 6h16.5v9.75a1.5 1.5 0 0 1-1.5 1.5h-15z"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6H3.75m12 3.75h-12m16.5 3.75H3.75m12 3.75h-12" fill="none"/>'
    },
    tags: ['alignment', 'arrangement', 'layout', 'flush left']
}
