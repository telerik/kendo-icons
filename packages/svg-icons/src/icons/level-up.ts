import { SVGIcon } from '../svg-icon.interface';

export const levelUpIcon: SVGIcon = {
    name: 'level-up',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="m3.75 9 4.5-4.5 4.5 4.5m-4.5-4.5V18h13.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M22.4989 18.0019a.75.75 0 0 1-.75.75H8.249a.75.75 0 0 1-.75-.75V9.752h-3.75a.75.75 0 0 1-.5306-1.2806l4.5-4.5a.75.75 0 0 1 1.0613 0l4.4999 4.5a.7501.7501 0 0 1-.5306 1.2806h-3.75v7.5H21.749a.75.75 0 0 1 .75.7499"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="m3.75 9 4.5-4.5 4.5 4.5m-4.5-4.5V18h13.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="m12.75 9-4.5-4.5L3.75 9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 18H8.25V9m4.5 0-4.5-4.5L3.75 9z" fill="none"/>'
    },
    tags: ['level', 'up', 'navigation', 'arrows']
}
