import { SVGIcon } from '../svg-icon.interface';

export const sortAscSmallIcon: SVGIcon = {
    name: 'sort-asc-small',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25V3.75m6.75 6.75L12 3.75 5.25 10.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M19.4418 10.7891a.75.75 0 0 1-.6928.4631h-5.9999v9a.7503.7503 0 0 1-.75.75.7502.7502 0 0 1-.75-.75v-9h-6a.749.749 0 0 1-.6934-.4629.75.75 0 0 1 .1628-.8177l6.7499-6.75a.75.75 0 0 1 1.0613 0l6.7499 6.75a.749.749 0 0 1 .1622.8175"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25V3.75m6.75 6.75L12 3.75 5.25 10.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M5.25 10.5 12 3.75l6.75 6.75z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25V10.5m-6.75 0L12 3.75l6.75 6.75z" fill="none"/>'
    },
    tags: ['sort', 'asc', 'small', 'actions', 'order', 'arrange']
}
