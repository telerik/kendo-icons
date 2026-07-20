import { SVGIcon } from '../svg-icon.interface';

export const kpiStatusOpenIcon: SVGIcon = {
    name: 'kpi-status-open',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none"/>'
    },
    tags: ['kpi', 'status', 'open', 'actions']
}
