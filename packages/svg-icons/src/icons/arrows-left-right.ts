import { SVGIcon } from '../svg-icon.interface';

export const arrowsLeftRightIcon: SVGIcon = {
    name: 'arrows-left-right',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 15-3-3 3-3m-3 3h19.5m-3 3 3-3-3-3" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="m22.2795 12.5336-2.9999 3a.7502.7502 0 0 1-1.2807-.5306v-2.25H5.999v2.25a.75.75 0 0 1-.4629.6934.7501.7501 0 0 1-.8177-.1628l-3-3a.75.75 0 0 1-.22-.5306.75.75 0 0 1 .22-.5306l3-3a.75.75 0 0 1 1.2806.5306v2.25H17.999v-2.25a.7502.7502 0 0 1 1.2807-.5306l2.9999 3a.7486.7486 0 0 1 .1628.8178.75.75 0 0 1-.1628.2434"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 15-3-3 3-3m-3 3h19.5m-3 3 3-3-3-3" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="m18.75 15 3-3-3-3H5.25l-3 3 3 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="m5.25 15-3-3 3-3m-3 3h19.5m-3 3 3-3-3-3" fill="none"/>'
    },
    tags: ['directional', 'pointer', 'pointing', 'arrowhead']
}
