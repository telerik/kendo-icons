import { SVGIcon } from '../svg-icon.interface';

export const transactionsIcon: SVGIcon = {
    name: 'transactions',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="m16.5 19.5 3-3-3-3m3 3h-15m3-12-3 3 3 3m-3-3h15" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="m20.0296 17.0275-3 2.9999a.7501.7501 0 0 1-1.2806-.5306v-2.25H4.4991a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75H15.749v-2.2499a.7499.7499 0 0 1 1.2806-.5307l3 3a.75.75 0 0 1 .22.5306.75.75 0 0 1-.0572.2872.75.75 0 0 1-.1628.2435m-13.0611-6a.7501.7501 0 0 0 1.2806-.5306v-2.25H19.499a.7499.7499 0 0 0 .5303-1.2803.75.75 0 0 0-.5303-.2197H8.249v-2.25a.75.75 0 0 0-1.2805-.5306l-3 3a.75.75 0 0 0 0 1.0612z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="m16.5 19.5 3-3-3-3m3 3h-15m3-12-3 3 3 3m-3-3h15" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M19.5 7.5h-15v9h15z"/><path stroke-linecap="round" stroke-linejoin="round" d="m16.4995 19.5 3-3-3-3m3 3h-15m3-12-3 3 3 3m-3-3h15" fill="none"/>'
    },
    tags: ['transactions', 'misc']
}
