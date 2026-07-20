import { SVGIcon } from '../svg-icon.interface';

export const paragraphMarkIcon: SVGIcon = {
    name: 'paragraph-mark',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 4.5v15m-3.75-15v15m0-4.5H9a5.2499 5.2499 0 0 1-3.7123-8.9623A5.25 5.25 0 0 1 9 4.5h10.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.2489 4.496a.75.75 0 0 1-.75.75h-1.5v14.25a.7499.7499 0 0 1-1.2803.5303.75.75 0 0 1-.2197-.5303V5.246h-2.25v14.25a.75.75 0 0 1-.75.75.75.75 0 0 1-.75-.75v-3.75h-3.75a6 6 0 1 1 0-12h10.5a.75.75 0 0 1 .75.75"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 4.5v15m-3.75-15v15m0-4.5H9a5.2499 5.2499 0 0 1-3.7123-8.9623A5.25 5.25 0 0 1 9 4.5h10.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M13.5 15H9a5.2499 5.2499 0 0 1-3.7123-8.9623A5.25 5.25 0 0 1 9 4.5h4.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 4.5v15m-3.75-15v15m0-4.5H9a5.2499 5.2499 0 0 1-3.7123-8.9623A5.25 5.25 0 0 1 9 4.5h10.5" fill="none"/>'
    },
    tags: ['paragraph', 'mark', 'editing', 'text', 'block', 'content']
}
