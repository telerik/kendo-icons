import { SVGIcon } from '../svg-icon.interface';

export const alignTopIcon: SVGIcon = {
    name: 'align-top',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 10.5h11.5m-13.75-3h16.5M6 4.5h11.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path fill-rule="evenodd" d="M19.5 21c.8284 0 1.5-.6716 1.5-1.5v-15c0-.8284-.6716-1.5-1.5-1.5h-15C3.6716 3 3 3.6716 3 4.5v15c0 .8284.6716 1.5 1.5 1.5zM8.25 6.7451a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5zm-2.25 3a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 0 1.5zm2.25 3a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M6 10.5h11.5m-13.75-3h16.5M6 4.5h11.5" fill="none"/>',
        'duotone': '<rect width="11.5" height="5.9971" fill-opacity="0.2" rx="0.75" transform="matrix(1 0 0 -1 6.25 10.4976)"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 10.5h11.5m-13.75-3h16.5M6 4.5h11.5" fill="none"/>'
    },
    tags: ['alignment', 'arrangement', 'layout', 'flush top']
}
