import { SVGIcon } from '../svg-icon.interface';

export const onPageConnectorShapeIcon: SVGIcon = {
    name: 'on-page-connector-shape',
    content: '<path stroke="#000" stroke-miterlimit="10" stroke-width="1.5" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M19.258 12a7.258 7.258 0 1 0-14.516 0 7.258 7.258 0 0 0 14.516 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/><path fill-rule="evenodd" d="M12 4.742a7.258 7.258 0 1 1 0 14.516 7.258 7.258 0 0 1 0-14.516" clip-rule="evenodd"/>',
        'outline': '<path stroke="#000" stroke-miterlimit="10" stroke-width="1.5" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>',
        'duotone': '<path stroke="#000" stroke-miterlimit="10" stroke-width="1.5" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path fill-opacity="0.2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18"/>'
    }
}
