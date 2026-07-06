import { SVGIcon } from '../svg-icon.interface';

export const foregroundColorIcon: SVGIcon = {
    name: 'foreground-color',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 20.1992H3.7501M18 17.2 12 4.45 6 17.2m10.2356-3.75H7.7644" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M10.1904 11.6064 12 7.7607l1.8096 3.8457z"/><path fill-rule="evenodd" d="M3.875 20.25c-.431 0-.8447-.1445-1.1494-.4023s-.4756-.608-.4756-.9727V5.125c0-.3647.1709-.7148.4756-.9727.3047-.2578.7184-.4023 1.1494-.4023h16.25c.431 0 .8447.1445 1.1494.4023s.4756.608.4756.9727v13.75c0 .3647-.1709.7148-.4756.9727-.3047.2578-.7184.4023-1.1494.4023zm3.5684-4.5674c.3746.1763.8215.0162.998-.3584l1.044-2.2178h5.0292l1.044 2.2178c.1765.3746.6234.5347.998.3584a.75.75 0 0 0 .3594-.998l-4.2373-9.004a.7502.7502 0 0 0-1.3574 0l-4.2373 9.004a.75.75 0 0 0 .3594.998M18.1875 18.75a.75.75 0 0 0 0-1.5H5.8125a.7501.7501 0 0 0 0 1.5z" clip-rule="evenodd"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 20.1992H3.7501M18 17.2 12 4.45 6 17.2m10.2356-3.75H7.7644" fill="none"/>',
        'duotone': '<path stroke-linecap="round" stroke-linejoin="round" d="M20.2498 20.1992H3.75M17.9998 17.2l-6-12.75-6 12.75m10.2357-3.75H7.7642" fill="none"/><path fill-opacity="0.2" d="M15.0507 12.6923h-6.101l3.0463-6.4738z"/>'
    },
    tags: ['foreground', 'color', 'text', 'text-formatting', 'paint', 'palette', 'fill']
}
