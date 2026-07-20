import { SVGIcon } from '../svg-icon.interface';

export const undoIcon: SVGIcon = {
    name: 'undo',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75 3 8.25l4.5 4.5M3 8.25h12.75a5.25 5.25 0 0 1 0 10.5H7.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M21.7501 13.5001a6.006 6.006 0 0 1-1.7593 4.2407 6.006 6.006 0 0 1-4.2407 1.7593h-8.25a.7498.7498 0 0 1-.5303-1.2803.75.75 0 0 1 .5303-.2197h8.25a4.5 4.5 0 1 0 0-9h-7.5v3.75a.7501.7501 0 0 1-1.2806.5306l-4.5-4.5a.75.75 0 0 1 0-1.0612l4.5-4.5A.75.75 0 0 1 8.25 3.75v3.75h7.5a6.0064 6.0064 0 0 1 6 6"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75 3 8.25l4.5 4.5M3 8.25h12.75a5.25 5.25 0 0 1 0 10.5H7.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M7.5 12.75 3 8.25l4.5-4.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 18.75h8.25a5.2499 5.2499 0 0 0 3.7123-8.9623A5.25 5.25 0 0 0 15.75 8.25H7.5m0 4.5L3 8.25l4.5-4.5z" fill="none"/>'
    },
    tags: ['undo', 'actions', 'revert', 'back']
}
