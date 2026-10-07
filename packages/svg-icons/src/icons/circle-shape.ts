import { SVGIcon } from '../svg-icon.interface';

export const circleShapeIcon: SVGIcon = {
    name: 'circle-shape',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M11.9997 21.7501c5.3847 0 9.7499-4.3652 9.7499-9.7499s-4.3652-9.75-9.7499-9.75-9.75 4.3652-9.75 9.75c0 5.3847 4.3653 9.7499 9.75 9.7499"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'legacy': '<path d="M12 1.5C6.2016 1.5 1.5 6.2016 1.5 12S6.2016 22.5 12 22.5 22.5 17.7984 22.5 12 17.7984 1.5 12 1.5M12 21c-4.9641 0-9-4.0359-9-9s4.0359-9 9-9 9 4.0359 9 9-4.0359 9-9 9"/>'
    },
    tags: ['circle', 'shape', 'editing', 'form', 'polygon', 'geometry']
}
