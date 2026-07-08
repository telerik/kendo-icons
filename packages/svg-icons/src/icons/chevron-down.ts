import { SVGIcon } from '../svg-icon.interface';

export const chevronDownIcon: SVGIcon = {
    name: 'chevron-down',
    content: '<path d="m20.53 9.19-8.1 8.1a.607.607 0 0 1-.86 0l-8.1-8.1a.607.607 0 0 1 .86-.86L12 16l7.67-7.67a.607.607 0 0 1 .858.858z"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="m20.674 9.334-8.1 8.1a.81.81 0 0 1-1.146 0l-8.1-8.1a.81.81 0 0 1 .573-1.384h16.2a.81.81 0 0 1 .574 1.384z"/>',
        'outline': '<path d="m20.53 9.19-8.1 8.1a.607.607 0 0 1-.86 0l-8.1-8.1a.607.607 0 0 1 .86-.86L12 16l7.67-7.67a.607.607 0 0 1 .858.858z"/>',
        'duotone': '<path d="m20.1 8.76-8.1 8.1-8.1-8.1z" opacity="0.2"/><path d="M20.849 8.45a.81.81 0 0 0-.749-.5H3.9a.81.81 0 0 0-.574 1.384l8.1 8.1a.81.81 0 0 0 1.146 0l8.1-8.1a.81.81 0 0 0 .176-.884zM12 15.715 5.855 9.57h12.289z"/>'
    },
    tags: ['chevron', 'down', 'navigation', 'arrows', 'arrow', 'direction', 'caret']
}
