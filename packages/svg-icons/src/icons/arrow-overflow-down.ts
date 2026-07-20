import { SVGIcon } from '../svg-icon.interface';

export const arrowOverflowDownIcon: SVGIcon = {
    name: 'arrow-overflow-down',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v14.25m6.75-6.75L12 17.25 5.25 10.5m-1.5 9.75h16.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M4.7184 11.0274a.7501.7501 0 0 1 .5306-1.2806h5.9999v-6.75a.75.75 0 0 1 .75-.75.7503.7503 0 0 1 .75.75v6.75h6a.75.75 0 0 1 .6934.4629.75.75 0 0 1-.1628.8177l-6.75 6.7499a.7486.7486 0 0 1-.8178.1628.75.75 0 0 1-.2434-.1628zm15.5305 8.4693h-16.5a.7498.7498 0 0 0-.5302 1.2803.75.75 0 0 0 .5303.2197h16.4999a.7499.7499 0 0 0 .5303-1.2803.75.75 0 0 0-.5303-.2197"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v14.25m6.75-6.75L12 17.25 5.25 10.5m-1.5 9.75h16.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M5.25 10.5 12 17.25l6.75-6.75z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v7.5m-8.25 9.75h16.5m-15-9.75L12 17.25l6.75-6.75z" fill="none"/>'
    },
    tags: ['arrow', 'overflow', 'down', 'navigation', 'direction', 'navigate', 'pointer']
}
