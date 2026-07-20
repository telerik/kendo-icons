import { SVGIcon } from '../svg-icon.interface';

export const connectorIcon: SVGIcon = {
    name: 'connector',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 16.5c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3432-3 3-3 3 1.3431 3 3m0 0c8.25 0 3.75-9 12-9h3m-3 3 3-3-3-3" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<g clip-path="url(#a)"><path d="m23.0294 8.0295-2.9999 3a.7503.7503 0 0 1-1.2811-.5306c0-.199.0791-.3899.2198-.5306l1.7203-1.7194h-1.1897c-3.6252 0-4.3677 1.7813-5.308 4.0387-.9685 2.325-2.0672 4.9612-6.6919 4.9612h-.0937a3 3 0 1 1 0-1.4999h.0937c3.6253 0 4.3678-1.7813 5.3081-4.0388.9731-2.325 2.0672-4.9612 6.6918-4.9612h1.1897l-1.7203-1.7193a.7505.7505 0 0 1 1.0613-1.0613l2.9999 3a.749.749 0 0 1 .1628.8178.75.75 0 0 1-.1628.2434"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h23.9998v23.9998H0z"/></clipPath></defs>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 16.5c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3432-3 3-3 3 1.3431 3 3m0 0c8.25 0 3.75-9 12-9h3m-3 3 3-3-3-3" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M4.5 19.5c1.6569 0 3-1.3431 3-3s-1.3431-3-3-3-3 1.3431-3 3 1.3432 3 3 3"/><path stroke-linecap="round" stroke-linejoin="round" d="M7.4995 16.5c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3432-3 3-3 3 1.3431 3 3m0 0c8.25 0 3.75-9 12-9h3m-3 3 3-3-3-3" fill="none"/>'
    },
    tags: ['connector', 'actions']
}
