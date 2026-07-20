import { SVGIcon } from '../svg-icon.interface';

export const bookIcon: SVGIcon = {
    name: 'book',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.25A2.25 2.25 0 0 1 6.75 18H19.5V3H6.75A2.25 2.25 0 0 0 4.5 5.25zm0 0V21H18" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.2489 2.9993V17.999a.75.75 0 0 1-.75.75H6.749a1.5 1.5 0 0 0-1.5 1.5H17.999a.7497.7497 0 0 1 .75.75.75.75 0 0 1-.75.75H4.499a.75.75 0 0 1-.75-.75V5.2492a3 3 0 0 1 3-3h12.7499a.75.75 0 0 1 .75.75"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.25A2.25 2.25 0 0 1 6.75 18H19.5V3H6.75A2.25 2.25 0 0 0 4.5 5.25zm0 0V21H18" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M4.5 20.25A2.25 2.25 0 0 1 6.75 18H19.5V3H6.75A2.25 2.25 0 0 0 4.5 5.25z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.25A2.25 2.25 0 0 1 6.75 18H19.5V3H6.75A2.25 2.25 0 0 0 4.5 5.25zm0 0V21H18" fill="none"/>'
    },
    tags: ['reading', 'reader', 'novel', 'story', 'library']
}
