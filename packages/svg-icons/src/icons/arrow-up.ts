import { SVGIcon } from '../svg-icon.interface';

export const arrowUpIcon: SVGIcon = {
    name: 'arrow-up',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25V3.75m6.75 6.75L12 3.75 5.25 10.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M19.4417 10.7891a.75.75 0 0 1-.6928.4631h-6v9a.75.75 0 0 1-.75.75.7503.7503 0 0 1-.7499-.75v-9h-6a.749.749 0 0 1-.6935-.4629.75.75 0 0 1 .1629-.8177l6.7499-6.75a.75.75 0 0 1 .5306-.2199.75.75 0 0 1 .5307.22l6.7499 6.75a.75.75 0 0 1 .1622.8174"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25V3.75m6.75 6.75L12 3.75 5.25 10.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M5.25 10.5 12 3.75l6.75 6.75z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25V10.5m-6.75 0L12 3.75l6.75 6.75z" fill="none"/>'
    },
    tags: ['directional', 'pointer', 'pointing', 'arrowhead']
}
