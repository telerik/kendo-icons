import { SVGIcon } from '../svg-icon.interface';

export const linePointSquareIcon: SVGIcon = {
    name: 'line-point-square',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.1482 12.0015h11.8513M4.5004 9.75h4.5v4.5h-4.5z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.1482 12.0015h11.8513M4.5004 9.75h4.5v4.5h-4.5z" fill="none"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.1482 12.0015h11.8513M4.5004 9.75h4.5v4.5h-4.5z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'duotone': '<path fill-opacity="0.2" d="M4.5004 9.75h4.5v4.5h-4.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.1482 12.0015h11.8513M4.5004 9.75h4.5v4.5h-4.5z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>'
    },
    tags: ['line', 'point', 'square', 'node', 'handle']
}
