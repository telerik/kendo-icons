import { SVGIcon } from '../svg-icon.interface';

export const fileHorizontalIcon: SVGIcon = {
    name: 'file-horizontal',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 4.5 21 9.75v9a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75zM21 9.75h-5.25V4.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path fill-rule="evenodd" d="M21.75 9.75a.75.75 0 0 0-.2197-.5303l-5.25-5.25A.75.75 0 0 0 15.75 3.75h-12a1.4999 1.4999 0 0 0-1.5 1.5v13.5c0 .3978.1582.7792.4394 1.0605A1.5 1.5 0 0 0 3.75 20.25h16.5c.3978 0 .7792-.1581 1.0605-.4395A1.5 1.5 0 0 0 21.75 18.75zm-5.8633-.1035V5.8857l3.7608 3.7608z" clip-rule="evenodd"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 4.5 21 9.75v9a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75zM21 9.75h-5.25V4.5" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M15.75 4.5v5.25H21z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 4.5 21 9.75v9a.7497.7497 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75zM21 9.75h-5.25V4.5" fill="none"/>'
    },
    tags: ['file', 'horizontal', 'page', 'landscape', 'h', 'files-and-folders', 'document', 'paper']
}
