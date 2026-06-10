import { SVGIcon } from '../svg-icon.interface';

export const capDiamondEndShapeIcon: SVGIcon = {
    name: 'cap-diamond-end-shape',
    content: '<g clip-path="url(#a)"><path stroke="#000" stroke-linecap="round" stroke-width="1.5" d="M3.75 12h8.5m8 0-4.066-4.066L12.118 12l4.066 4.066z"/></g><defs><clipPath id="a"><path fill="#fff" d="M24 0H0v24h24z"/></clipPath></defs>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<g clip-path="url(#a)"><path d="M3.75 11.25a.75.75 0 1 0 0 1.5h8.5a.75.75 0 0 0 0-1.5z"/><path fill-rule="evenodd" d="M16.184 6.874 11.058 12l5.126 5.127L21.311 12z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M24 0H0v24h24z"/></clipPath></defs>',
        'outline': '<g clip-path="url(#a)"><path stroke="#000" stroke-linecap="round" stroke-width="1.5" d="M3.75 12h8.5m8 0-4.066-4.066L12.118 12l4.066 4.066z"/></g><defs><clipPath id="a"><path fill="#fff" d="M24 0H0v24h24z"/></clipPath></defs>',
        'duotone': '<path stroke="#000" stroke-linecap="round" stroke-width="1.5" d="M3.75 12h8.5m8 0-4.066-4.066L12.118 12l4.066 4.066z"/><path fill-opacity="0.2" d="m20.25 12-4.066-4.066L12.118 12l4.066 4.066z"/>'
    }
}
