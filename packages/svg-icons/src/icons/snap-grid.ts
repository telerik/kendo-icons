import { SVGIcon } from '../svg-icon.interface';

export const snapGridIcon: SVGIcon = {
    name: 'snap-grid',
    content: '<path stroke-linecap="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-15-15v16.5m9-16.5v16.5m-4.5-16.5v16.5m9 0V3.75" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M11.25 12.75v4.5h-4.5v-4.5zM17.25 12.75v4.5h-4.5v-4.5zM11.25 6.75v4.5h-4.5v-4.5zM17.25 6.75v4.5h-4.5v-4.5z"/><path fill-rule="evenodd" d="M19.5 3c.3978 0 .7792.1582 1.0605.4394.2814.2814.4395.6628.4395 1.0606v15c0 .3978-.1581.7792-.4395 1.0605A1.5 1.5 0 0 1 19.5 21h-15a1.5 1.5 0 0 1-1.0606-.4395A1.5 1.5 0 0 1 3 19.5v-15A1.4999 1.4999 0 0 1 4.5 3zM18 4.25a.75.75 0 0 0-.75.75v.25h-4.5V5a.75.75 0 0 0-1.5 0v.25h-4.5V5a.75.75 0 0 0-1.5 0v.25H5a.75.75 0 0 0 0 1.5h.25v4.5H5a.75.75 0 0 0 0 1.5h.25v4.5H5a.75.75 0 0 0 0 1.5h.25V19a.75.75 0 0 0 1.5 0v-.25h4.5V19a.75.75 0 0 0 1.5 0v-.25h4.5V19a.75.75 0 0 0 1.5 0v-.25H19a.75.75 0 0 0 0-1.5h-.25v-4.5H19a.75.75 0 0 0 0-1.5h-.25v-4.5H19a.75.75 0 0 0 0-1.5h-.25V5a.75.75 0 0 0-.75-.75" clip-rule="evenodd"/>',
        'outline': '<path stroke-linecap="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-15-15v16.5m9-16.5v16.5m-4.5-16.5v16.5m9 0V3.75" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M5.25 5.25h13.5v13.5H5.25z"/><path stroke-linecap="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-15-15v16.5m9-16.5v16.5m-4.5-16.5v16.5m9 0V3.75" fill="none"/>'
    },
    tags: ['snap', 'grid', 'editing', 'layout', 'tiles', 'view']
}
