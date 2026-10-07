import { SVGIcon } from '../svg-icon.interface';

export const copyIcon: SVGIcon = {
    name: 'copy',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75h4.5v-12h-12v4.5m-4.5 0h12v12h-12z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.2489 3.0034h-12a.75.75 0 0 0-.75.75v3.75H3.749a.75.75 0 0 0-.75.75v11.9999a.75.75 0 0 0 .75.75H15.749a.75.75 0 0 0 .75-.75v-3.75h3.75a.7497.7497 0 0 0 .75-.75V3.7534a.75.75 0 0 0-.75-.75m-.75 11.9999h-3v-6.75a.75.75 0 0 0-.75-.75h-6.75V4.5035h10.5z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75h4.5v-12h-12v4.5m-4.5 0h12v12h-12z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'duotone': '<path fill-opacity="0.2" d="M8.25 3.75v4.5h7.5v7.5h4.5v-12z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75h4.5v-12h-12v4.5m-4.5 0h12v12h-12z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'legacy': '<path d="M18 4.5H9c-.8297 0-1.5.6703-1.5 1.5v15c0 .8297.6703 1.5 1.5 1.5h12c.8297 0 1.5-.6703 1.5-1.5V9zM21 21H9V6h7.5v4.5H21zM3 18h3v1.5H3c-.8297 0-1.5-.6703-1.5-1.5V3c0-.8297.6703-1.5 1.5-1.5h9L13.5 3H3z"/>'
    },
    tags: ['duplicated', 'copied', 'clipboard']
}
