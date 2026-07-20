import { SVGIcon } from '../svg-icon.interface';

export const imageResizeIcon: SVGIcon = {
    name: 'image-resize',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 9V4.5H15m4.5 0-6 6m-9 4.5v4.5H9m-4.5 0 6-6" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.2496 4.499v4.5a.7502.7502 0 0 1-.8964.7361.75.75 0 0 1-.3842-.2055l-1.7193-1.7203-3.2194 3.2203a.7505.7505 0 1 1-1.0612-1.0613l3.2202-3.2193-1.7203-1.7194a.7501.7501 0 0 1 .5307-1.2806h4.4999a.7503.7503 0 0 1 .75.75M9.9691 12.9683l-3.2194 3.2203-1.7193-1.7203a.7501.7501 0 0 0-1.2806.5306v4.5a.75.75 0 0 0 .75.75h4.5a.7501.7501 0 0 0 .5305-1.2806L7.81 17.2489l3.2203-3.2193a.7503.7503 0 0 0-.5306-1.2811.75.75 0 0 0-.5306.2198"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 9V4.5H15m4.5 0-6 6m-9 4.5v4.5H9m-4.5 0 6-6" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M19.5 3h-15C3.6716 3 3 3.6716 3 4.5v15c0 .8284.6716 1.5 1.5 1.5h15c.8284 0 1.5-.6716 1.5-1.5v-15c0-.8284-.6716-1.5-1.5-1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 9V4.5H15m4.5 0-6 6m-9 4.5v4.5H9m-4.5 0 6-6" fill="none"/>'
    },
    tags: ['image', 'resize', 'images', 'photo', 'picture', 'gallery', 'scale', 'expand', 'shrink']
}
