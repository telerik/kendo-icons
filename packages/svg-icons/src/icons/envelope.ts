import { SVGIcon } from '../svg-icon.interface';

export const envelopeIcon: SVGIcon = {
    name: 'envelope',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="m21 5.25-9 8.25-9-8.25m0 0V18a.75.75 0 0 0 .75.75h16.5A.7497.7497 0 0 0 21 18V5.25zM10.3639 12l-7.1324 6.5381m17.5367 0L13.6357 12" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.9989 4.4983H2.999a.75.75 0 0 0-.75.75v12.7499a1.5 1.5 0 0 0 1.5 1.5H20.249a1.5 1.5 0 0 0 1.5-1.5v-12.75a.75.75 0 0 0-.75-.75M9.253 11.9982l-5.504 5.0447V6.9536zm1.11 1.0172 1.125 1.0359a.75.75 0 0 0 1.0144 0l1.125-1.0359 5.4374 4.9828H4.9274zm4.3819-1.0172 5.504-5.0456v10.0912z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="m21 5.25-9 8.25-9-8.25m0 0V18a.75.75 0 0 0 .75.75h16.5A.7497.7497 0 0 0 21 18V5.25zM10.3639 12l-7.1324 6.5381m17.5367 0L13.6357 12" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="m21 5.25-9 8.25-9-8.25z"/><path stroke-linecap="round" stroke-linejoin="round" d="m21 5.25-9 8.25-9-8.25m0 0V18a.75.75 0 0 0 .75.75h16.5A.7497.7497 0 0 0 21 18V5.25zM10.3641 12l-7.1325 6.5381m17.5368 0L13.6359 12" fill="none"/>'
    },
    tags: ['mail', 'email', 'send', 'sent', 'message', 'post', 'letter']
}
