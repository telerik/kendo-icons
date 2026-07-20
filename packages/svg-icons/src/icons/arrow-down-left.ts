import { SVGIcon } from '../svg-icon.interface';

export const arrowDownLeftIcon: SVGIcon = {
    name: 'arrow-down-left',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="m9 21-4.5-4.5L9 12m-4.5 4.5H18V3" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M18.7489 3.0032V16.503a.75.75 0 0 1-.7499.75h-8.25v3.7499a.75.75 0 0 1-.4629.6935.75.75 0 0 1-.8177-.1628l-4.5-4.5a.75.75 0 0 1-.22-.5306.75.75 0 0 1 .22-.5307l4.5-4.4999a.75.75 0 0 1 1.2806.5306v3.75h7.5v-12.75a.75.75 0 0 1 .75-.75.75.75 0 0 1 .7499.75"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="m9 21-4.5-4.5L9 12m-4.5 4.5H18V3" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="m9 12-4.5 4.5L9 21z"/><path stroke-linecap="round" stroke-linejoin="round" d="M18 3v13.5H9M9 12l-4.5 4.5L9 21z" fill="none"/>'
    },
    tags: ['directional', 'pointer', 'pointing', 'arrowhead']
}
