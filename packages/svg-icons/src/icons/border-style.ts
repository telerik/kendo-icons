import { SVGIcon } from '../svg-icon.interface';

export const borderStyleIcon: SVGIcon = {
    name: 'border-style',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 20.25h10.5m-13.5-3V6.75m16.5 10.5V6.75m-13.5-3h10.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path fill-rule="evenodd" d="M4.5 3A1.4999 1.4999 0 0 0 3 4.5v15c0 .3978.1582.7792.4394 1.0605A1.5 1.5 0 0 0 4.5 21h15c.3978 0 .7792-.1581 1.0605-.4395A1.5 1.5 0 0 0 21 19.5v-15c0-.3978-.1581-.7792-.4395-1.0606A1.5 1.5 0 0 0 19.5 3zm11.3496 14.25a.75.75 0 0 1 0 1.5H8.1504a.75.75 0 0 1 0-1.5zM18 7.4004a.75.75 0 0 1 .75.75v7.6992a.75.75 0 0 1-1.5 0V8.1504a.75.75 0 0 1 .75-.75m-12 0a.75.75 0 0 1 .75.75v7.6992a.75.75 0 0 1-1.5 0V8.1504a.75.75 0 0 1 .75-.75M15.8496 5.25a.75.75 0 0 1 0 1.5H8.1504a.75.75 0 0 1 0-1.5z" clip-rule="evenodd"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 20.25h10.5m-13.5-3V6.75m16.5 10.5V6.75m-13.5-3h10.5" fill="none"/>',
        'duotone': '<rect width="16.5" height="16.5" x="3.75" y="3.75" fill-opacity="0.2" rx="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 20.25h10.5m-13.5-3V6.75m16.5 10.5V6.75m-13.5-3h10.5" fill="none"/>'
    },
    tags: ['border', 'style', 'css', 'borders']
}
