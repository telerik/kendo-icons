import { SVGIcon } from '../svg-icon.interface';

export const indentIcon: SVGIcon = {
    name: 'indent',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 12h9.75M10.5 6h9.75M3.75 18h16.5M3.75 5.25 7.5 9l-3.75 3.75" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.9989 11.9978a.75.75 0 0 1-.75.75H10.499a.7503.7503 0 0 1-.75-.75.75.75 0 0 1 .75-.7499h9.7499a.75.75 0 0 1 .75.7499m-10.4999-5.25h9.7499a.7499.7499 0 1 0 0-1.4999H10.499a.7501.7501 0 0 0 0 1.5m9.7499 10.5H3.749a.7498.7498 0 0 0-.5303 1.2803.75.75 0 0 0 .5303.2197H20.249a.7497.7497 0 0 0 .75-.75.7497.7497 0 0 0-.75-.75M3.4622 13.4406a.75.75 0 0 0 .8174-.1621l3.75-3.75a.75.75 0 0 0 0-1.0612l-3.75-3.75a.75.75 0 0 0-1.2806.5306v7.4999a.75.75 0 0 0 .4631.6928"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 12h9.75M10.5 6h9.75M3.75 18h16.5M3.75 5.25 7.5 9l-3.75 3.75" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M20.25 6H3.75v12h16.5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 12h9.75M10.5 6h9.75M3.75 18h16.5M3.75 5.25 7.5 9l-3.75 3.75" fill="none"/>'
    },
    tags: ['indent', 'text-formatting', 'tab', 'margin', 'offset']
}
