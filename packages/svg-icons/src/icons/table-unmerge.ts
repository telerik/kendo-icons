import { SVGIcon } from '../svg-icon.interface';

export const tableUnmergeIcon: SVGIcon = {
    name: 'table-unmerge',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75h18m-18 4.5h18M8.25 9.75v9M3 5.25h18V18a.7497.7497 0 0 1-.75.75H3.75A.75.75 0 0 1 3 18z" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M21 4.5H3a.75.75 0 0 0-.75.75V18a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25A.75.75 0 0 0 21 4.5m-17.25 6H7.5v3H3.75zm5.25 0h11.25v3H9zM3.75 15H7.5v3H3.75zm16.5 3H9v-3h11.25z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75h18m-18 4.5h18M8.25 9.75v9M3 5.25h18V18a.7497.7497 0 0 1-.75.75H3.75A.75.75 0 0 1 3 18z" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M8.25 9.75H3v9h5.25z"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75h18m-18 4.5h18M8.25 9.75v9M3 5.25h18V18a.7497.7497 0 0 1-.75.75H3.75A.75.75 0 0 1 3 18z" fill="none"/>'
    },
    tags: ['table', 'unmerge', 'editing', 'grid', 'spreadsheet', 'data']
}
