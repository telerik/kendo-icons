import { SVGIcon } from '../svg-icon.interface';

export const dragAndDropIcon: SVGIcon = {
    name: 'drag-and-drop',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.4999 12h9.7499M3.75 8.25 7.5 12l-3.75 3.7499z" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M3.75 8.25 7.5 12l-3.75 3.7499"/><path stroke-linecap="round" stroke-linejoin="round" d="M10.4999 12h9.7499M3.75 8.25 7.5 12l-3.75 3.7499z" fill="none"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M10.4999 12h9.7499M3.75 8.25 7.5 12l-3.75 3.7499z" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M3.75 8.25 7.5 12l-3.75 3.7499"/><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 11.9995h9.7499m-16.4998-3.75 3.75 3.75-3.75 3.7499z" fill="none"/>'
    },
    tags: ['drag', 'and', 'drop', 'navigation', 'move', 'reorder', 'handle', 'release', 'place']
}
