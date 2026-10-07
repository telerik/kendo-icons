import { SVGIcon } from '../svg-icon.interface';

export const paragraphMarkIcon: SVGIcon = {
    name: 'paragraph-mark',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 4.5v15m-3.75-15v15m0-4.5H9a5.2499 5.2499 0 0 1-3.7123-8.9623A5.25 5.25 0 0 1 9 4.5h10.5" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.2489 4.496a.75.75 0 0 1-.75.75h-1.5v14.25a.7499.7499 0 0 1-1.2803.5303.75.75 0 0 1-.2197-.5303V5.246h-2.25v14.25a.75.75 0 0 1-.75.75.75.75 0 0 1-.75-.75v-3.75h-3.75a6 6 0 1 1 0-12h10.5a.75.75 0 0 1 .75.75"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 4.5v15m-3.75-15v15m0-4.5H9a5.2499 5.2499 0 0 1-3.7123-8.9623A5.25 5.25 0 0 1 9 4.5h10.5" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'duotone': '<path fill-opacity="0.2" d="M13.5 15H9a5.2499 5.2499 0 0 1-3.7123-8.9623A5.25 5.25 0 0 1 9 4.5h4.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 4.5v15m-3.75-15v15m0-4.5H9a5.2499 5.2499 0 0 1-3.7123-8.9623A5.25 5.25 0 0 1 9 4.5h10.5" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'legacy': '<path d="M19.8652 3.248h-3.4955v19.2262h-1.748V3.248h-3.4954v19.2262h-1.748V11.9873c-2.895 0-5.2434-2.3484-5.2435-5.2434s2.3484-5.2434 5.2435-5.2434h10.4869v1.7479Z"/>'
    },
    tags: ['paragraph', 'mark', 'editing', 'text', 'block', 'content']
}
