import { SVGIcon } from '../svg-icon.interface';

export const capDiamondStartShapeIcon: SVGIcon = {
    name: 'cap-diamond-start-shape',
    content: '<g clip-path="url(#a)"><path stroke="#000" stroke-linecap="round" stroke-width="1.5" d="M20.25 12h-8.5m-8 0 4.066-4.066L11.882 12l-4.066 4.066z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<g clip-path="url(#a)"><path d="M20.25 11.25a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5z"/><path fill-rule="evenodd" d="M7.816 6.874 12.942 12l-5.126 5.127L2.689 12z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs>',
        'outline': '<g clip-path="url(#a)"><path stroke="#000" stroke-linecap="round" stroke-width="1.5" d="M20.25 12h-8.5m-8 0 4.066-4.066L11.882 12l-4.066 4.066z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs>',
        'duotone': '<path stroke="#000" stroke-linecap="round" stroke-width="1.5" d="M20.25 12h-8.5m-8 0 4.066-4.066L11.882 12l-4.066 4.066z"/><path fill-opacity="0.2" d="m3.75 12 4.066-4.066L11.882 12l-4.066 4.066z"/>'
    }
}
