import { SVGIcon } from '../svg-icon.interface';

export const tagChevronIcon: SVGIcon = {
    name: 'tag-chevron',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 18.75h14.5988a.75.75 0 0 0 .6234-.3337L22.5 12l-4.2778-6.4162a.75.75 0 0 0-.6234-.3338H3L7.5 12z" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<g clip-path="url(#a)"><path d="m23.1232 12.4199-4.2806 6.4162a1.499 1.499 0 0 1-1.2449.6674H2.999a.75.75 0 0 1-.6617-.396.75.75 0 0 1 .0373-.7702l4.2235-6.3337-4.2188-6.3337a.75.75 0 0 1 .6197-1.1662h14.5987a1.5 1.5 0 0 1 1.2449.6675l4.2778 6.4162a.7497.7497 0 0 1 .0028.8325"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h23.9998v23.9998H0z"/></clipPath></defs>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 18.75h14.5988a.75.75 0 0 0 .6234-.3337L22.5 12l-4.2778-6.4162a.75.75 0 0 0-.6234-.3338H3L7.5 12z" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M3 18.75h14.5988a.75.75 0 0 0 .6234-.3337L22.5 12l-4.2778-6.4162a.75.75 0 0 0-.6234-.3338H3L7.5 12z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.9995 18.75h14.5988a.75.75 0 0 0 .6234-.3337L22.4995 12l-4.2778-6.4162a.75.75 0 0 0-.6234-.3338H2.9995l4.5 6.75z" fill="none"/>'
    },
    tags: ['tags', 'hashtag', 'labels', 'sale']
}
