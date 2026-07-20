import { SVGIcon } from '../svg-icon.interface';

export const arrowDownIcon: SVGIcon = {
    name: 'arrow-down',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75v16.5m6.75-6.75L12 20.25 5.25 13.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="m19.2795 14.0276-6.7499 6.75a.7504.7504 0 0 1-1.0613 0l-6.75-6.75a.75.75 0 0 1 .5307-1.2806h6v-9a.75.75 0 0 1 .7499-.75.75.75 0 0 1 .75.75v9h6a.75.75 0 0 1 .6935.4629.75.75 0 0 1-.1629.8177"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75v16.5m6.75-6.75L12 20.25 5.25 13.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M5.25 13.5 12 20.25l6.75-6.75z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75v9.75m-6.75 0L12 20.25l6.75-6.75z" fill="none"/>'
    },
    tags: ['directional', 'pointer', 'pointing', 'arrowhead']
}
