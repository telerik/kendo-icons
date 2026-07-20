import { SVGIcon } from '../svg-icon.interface';

export const sumIcon: SVGIcon = {
    name: 'sum',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M18 6.75V4.5H6l6 7.5-6 7.5h12v-2.25" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M18.7489 2.2493H5.249a1.5 1.5 0 0 0-1.5 1.5V20.249a1.5 1.5 0 0 0 1.5 1.5H18.749a1.5 1.5 0 0 0 1.5-1.5V3.7493a1.5 1.5 0 0 0-1.5-1.5m-1.5 6a.75.75 0 0 1-.75.75.75.75 0 0 1-.75-.75v-1.5h-6.75l3.6001 4.7999a.75.75 0 0 1 0 .9l-3.6 4.8h6.7499v-1.5a.7501.7501 0 1 1 1.5 0v2.2499c0 .199-.079.3897-.2196.5304a.75.75 0 0 1-.5304.2196h-9a.749.749 0 0 1-.6707-.4145.75.75 0 0 1 .0708-.7854l4.1625-5.55-4.1625-5.55a.75.75 0 0 1 .6-1.2h8.9999a.7503.7503 0 0 1 .75.75z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M18 6.75V4.5H6l6 7.5-6 7.5h12v-2.25" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M18 4.5H6l6 7.5-6 7.5h12z"/><path stroke-linecap="round" stroke-linejoin="round" d="M18 6.75V4.5H6l6 7.5-6 7.5h12v-2.25" fill="none"/>'
    },
    tags: ['sum', 'editing', 'total', 'add', 'calculate']
}
