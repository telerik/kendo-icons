import { SVGIcon } from '../svg-icon.interface';

export const arrowsAxesIcon: SVGIcon = {
    name: 'arrows-axes',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M21 18H7.5V3.75M18 21l3-3-3-3m-7.5-8.25-3-3-3 3" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="m21.5296 18.5301-3 3a.7502.7502 0 0 1-1.2806-.5306v-2.25h-9.75a.75.75 0 0 1-.75-.75v-10.5h-2.25a.75.75 0 0 1-.5306-1.2805l3-3a.75.75 0 0 1 1.0613 0l2.9999 3a.75.75 0 0 1 .1629.8177.75.75 0 0 1-.6935.4629h-2.25v9.7499h9v-2.25a.75.75 0 0 1 .4629-.6934.7502.7502 0 0 1 .8177.1628l3 3a.75.75 0 0 1 .1627.2434.749.749 0 0 1 0 .5744.75.75 0 0 1-.1627.2434"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M21 18H7.5V3.75M18 21l3-3-3-3m-7.5-8.25-3-3-3 3" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M7.5 3.75h12a1.5 1.5 0 0 1 1.5 1.5V18H7.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 18H7.5V3.75M18 21l3-3-3-3m-7.5-8.25-3-3-3 3" fill="none"/>'
    },
    tags: ['arrows', 'axes', 'navigation']
}
