import { SVGIcon } from '../svg-icon.interface';

export const kpiStatusOpenIcon: SVGIcon = {
    name: 'kpi-status-open',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'legacy': '<path d="M22.5 12c0 5.7984-4.7016 10.5-10.5 10.5S1.5 17.7984 1.5 12 6.2016 1.5 12 1.5 22.5 6.2016 22.5 12"/>'
    },
    tags: ['kpi', 'status', 'open', 'actions']
}
