import { SVGIcon } from '../svg-icon.interface';

export const ovalShapeIcon: SVGIcon = {
    name: 'oval-shape',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18c4.9706 0 9-2.6863 9-6s-4.0294-6-9-6-9 2.6863-9 6 4.0294 6 9 6" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18c4.9706 0 9-2.6863 9-6s-4.0294-6-9-6-9 2.6863-9 6 4.0294 6 9 6"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18c4.9706 0 9-2.6863 9-6s-4.0294-6-9-6-9 2.6863-9 6 4.0294 6 9 6" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M11.7344 18c4.9705 0 9-2.6863 9-6s-4.0295-6-9-6-9 2.6863-9 6 4.0294 6 9 6"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 18c4.9706 0 9-2.6863 9-6s-4.0294-6-9-6-9 2.6863-9 6 4.0294 6 9 6" fill="none"/>'
    }
}
