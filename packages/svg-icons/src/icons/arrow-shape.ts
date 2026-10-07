import { SVGIcon } from '../svg-icon.interface';

export const arrowShapeIcon: SVGIcon = {
    name: 'arrow-shape',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6m0 9.75V6H8.25" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M18.749 6.0002v9.75a.7498.7498 0 0 1-.8965.7361.75.75 0 0 1-.3841-.2055l-4.3444-4.3453-6.5943 6.5953a.7505.7505 0 0 1-1.0613-1.0613l6.5953-6.5943-4.3453-4.3443a.75.75 0 0 1 .5307-1.2807h9.7499a.75.75 0 0 1 .75.75"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6m0 9.75V6H8.25" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'duotone': '<path fill-opacity="0.2" d="M8.25 6H18v9.75z"/><path stroke-linecap="round" stroke-linejoin="round" d="m6 18 7.125-7.125M8.25 6H18v9.75z" fill="none" stroke-width="var(--kendo-icon-stroke-width, 1.5)"/>',
        'legacy': '<path d="m22.5 1.5-.2255.9783-.0918.397-1.2718 5.5102-2.1187-2.1183-7.4152 7.4151L2.558 22.5 1.5 21.442l3.4364-3.4364 4.4944-4.4943.8878-.8874-.0009-.0009 7.4151-7.4152-2.1183-2.1187 5.5102-1.2718.397-.0918z"/>'
    },
    tags: ['arrow', 'shape', 'editing', 'direction', 'navigate', 'pointer', 'form', 'polygon', 'geometry']
}
