import { SVGIcon } from '../svg-icon.interface';

export const italicIcon: SVGIcon = {
    name: 'italic',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="m14.25 5.25-4.5 13.5m4.5-13.5H10.5m3.75 0H18m-8.25 13.5H6m3.75 0h3.75" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M19.4989 2.9968H4.499a1.5 1.5 0 0 0-1.5 1.5v14.9999a1.5 1.5 0 0 0 1.5 1.5H19.499a1.5 1.5 0 0 0 1.5-1.5V4.4968a1.5 1.5 0 0 0-1.5-1.5m-3 4.5h-2.0962l-3.2147 8.9999h1.5609a.75.75 0 1 1 0 1.5h-5.25a.7498.7498 0 0 1-.5302-1.2803.75.75 0 0 1 .5303-.2197h2.0962l3.2147-9H11.249a.7501.7501 0 1 1 0-1.4999h5.2499a.7499.7499 0 1 1 0 1.5"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="m14.25 5.25-4.5 13.5m4.5-13.5H10.5m3.75 0H18m-8.25 13.5H6m3.75 0h3.75" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M10.5 5.25H18l-4.5 13.5H6z"/><path stroke-linecap="round" stroke-linejoin="round" d="m14.25 5.25-4.5 13.5m4.5-13.5H10.5m3.75 0H18m-8.25 13.5H6m3.75 0h3.75" fill="none"/>'
    },
    tags: ['italic', 'text-formatting', 'emphasis', 'text']
}
