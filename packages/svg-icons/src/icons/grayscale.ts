import { SVGIcon } from '../svg-icon.interface';

export const grayscaleIcon: SVGIcon = {
    name: 'grayscale',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9m0 18c-4.9706 0-9-4.0294-9-9s4.0294-9 9-9m0 18V3m6 2.292v13.4156M15 3.5127v16.9744" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M11.9997 2.2532a9.7499 9.7499 0 1 0 9.7499 9.7499 9.76 9.76 0 0 0-9.7499-9.75m-8.25 9.7499a8.2593 8.2593 0 0 1 8.25-8.25V20.253a8.259 8.259 0 0 1-8.25-8.2499"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9m0 18c-4.9706 0-9-4.0294-9-9s4.0294-9 9-9m0 18V3m6 2.292v13.4156M15 3.5127v16.9744" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 3a9.0003 9.0003 0 0 1 9 9 9 9 0 0 1-2.636 6.364A9 9 0 0 1 12 21z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9m0 18c-4.9706 0-9-4.0294-9-9s4.0294-9 9-9m0 18V3" fill="none"/>'
    },
    tags: ['grayscale', 'images']
}
