import { SVGIcon } from '../svg-icon.interface';

export const splitHorizontalIcon: SVGIcon = {
    name: 'split-horizontal',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 4.5v15m4.5-15v15m0-7.5h7.5m-3 3 3-3-3-3m-16.5 3h7.5m-4.5 3-3-3 3-3" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M10.4989 4.4968v14.9999a.75.75 0 1 1-1.5 0v-6.7499h-3v2.2499a.75.75 0 0 1-.4628.6935.75.75 0 0 1-.8178-.1628l-3-3a.75.75 0 0 1-.2199-.5306.75.75 0 0 1 .22-.5307l3-3a.75.75 0 0 1 1.2806.5307v2.25h3v-6.75a.75.75 0 1 1 1.4999 0m11.7806 6.9693-3-3a.7501.7501 0 0 0-1.2806.5307v2.25h-3v-6.75a.7498.7498 0 0 0-1.2803-.5303.75.75 0 0 0-.2197.5303v14.9999a.7497.7497 0 0 0 .75.75.7497.7497 0 0 0 .75-.75v-6.7499h3v2.2499a.7499.7499 0 0 0 1.2806.5307l3-3a.75.75 0 0 0 .1628-.2434.75.75 0 0 0 0-.5744.75.75 0 0 0-.1628-.2435"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 4.5v15m4.5-15v15m0-7.5h7.5m-3 3 3-3-3-3m-16.5 3h7.5m-4.5 3-3-3 3-3" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="m18.75 9 3 3-3 3zM5.25 9l-3 3 3 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 4.5v15m4.5-15v15m0-7.5h4.5m-13.5 0h4.5m9-3 3 3-3 3zM5.25 9l-3 3 3 3z" fill="none"/>'
    },
    tags: ['resize', 'columns']
}
