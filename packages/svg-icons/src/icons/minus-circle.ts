import { SVGIcon } from '../svg-icon.interface';

export const minusCircleIcon: SVGIcon = {
    name: 'minus-circle',
    content: '<path stroke-linecap="round" stroke-miterlimit="10" d="M8.25 12h7.5M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Z" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M11.999 2.2495a9.75 9.75 0 1 0 9.7499 9.7499 9.7604 9.7604 0 0 0-9.7499-9.7499m3.7499 10.4999h-7.5a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75h7.5a.7502.7502 0 0 1 0 1.5"/>',
        'outline': '<path stroke-linecap="round" stroke-miterlimit="10" d="M8.25 12h7.5M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Z" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9"/><path stroke-linecap="round" stroke-miterlimit="10" d="M8.2495 12h7.5m5.25 0c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0295-9 9-9 9 4.0294 9 9Z" fill="none"/>'
    },
    tags: ['-', 'subtraction', 'difference', 'mathematics', 'arithmetic', 'calculator', 'round']
}
