import { SVGIcon } from '../svg-icon.interface';

export const minusIcon: SVGIcon = {
    name: 'minus',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M19.4989 2.9998H4.499a1.5 1.5 0 0 0-1.5 1.5v14.9998a1.5 1.5 0 0 0 1.5 1.5H19.499a1.5 1.5 0 0 0 1.5-1.5V4.4997a1.5 1.5 0 0 0-1.5-1.5m-2.25 9.7499h-10.5a.75.75 0 0 1-.7499-.75.75.75 0 0 1 .75-.75h10.4999a.7497.7497 0 0 1 .75.75.7497.7497 0 0 1-.75.75"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M18.75 3.75H5.25c-.8284 0-1.5.6716-1.5 1.5v13.5c0 .8284.6716 1.5 1.5 1.5h13.5c.8284 0 1.5-.6716 1.5-1.5V5.25c0-.8284-.6716-1.5-1.5-1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5" fill="none"/>'
    },
    tags: ['-', 'subtraction', 'difference', 'mathematics', 'arithmetic', 'calculator', 'line', 'horizontal', 'divider']
}
