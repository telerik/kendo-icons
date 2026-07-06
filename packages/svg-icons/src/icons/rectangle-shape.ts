import { SVGIcon } from '../svg-icon.interface';

export const rectangleShapeIcon: SVGIcon = {
    name: 'rectangle-shape',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 4.5H3.75a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h16.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.2489 3.748H3.749c-.8284 0-1.5.6716-1.5 1.5V18.748c0 .8285.6716 1.5 1.5 1.5H20.249c.8284 0 1.5-.6715 1.5-1.5V5.248c0-.8284-.6716-1.5-1.5-1.5"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 4.5H3.75a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h16.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M20.25 4.5H3.75a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h16.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 4.5H3.75a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h16.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75" fill="none"/>'
    },
    tags: ['rectangle', 'shape', 'editing', 'form', 'polygon', 'geometry']
}
