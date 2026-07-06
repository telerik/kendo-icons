import { SVGIcon } from '../svg-icon.interface';

export const downloadIcon: SVGIcon = {
    name: 'download',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 13.5V3M8.25 9.75 12 13.5l3.75-3.75m4.5 3.75v6H3.75v-6" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.9979 13.4999v6a.75.75 0 0 1-.75.75H3.748a.75.75 0 0 1-.75-.75v-6a.7498.7498 0 0 1 1.2804-.5303.75.75 0 0 1 .2196.5303v5.25H19.498v-5.25a.7497.7497 0 0 1 .75-.75.7497.7497 0 0 1 .75.75m-9.5305.5306a.7486.7486 0 0 0 .8178.1628.75.75 0 0 0 .2434-.1628l3.75-3.7499A.7502.7502 0 0 0 15.7479 9H12.748V3a.75.75 0 0 0-.75-.75.75.75 0 0 0-.75.75v6h-3a.75.75 0 0 0-.5306 1.2806z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 13.5V3M8.25 9.75 12 13.5l3.75-3.75m4.5 3.75v6H3.75v-6" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M5.25 3h13.5a1.5 1.5 0 0 1 1.5 1.5v15H3.75v-15A1.5 1.5 0 0 1 5.25 3"/><path stroke-linecap="round" stroke-linejoin="round" d="M11.9995 13.5V3m-3.75 6.75 3.75 3.75 3.75-3.75m4.5 3.75v6h-16.5v-6" fill="none"/>'
    },
    tags: ['saved', 'saving', 'archived', 'archiving', 'archival', 'downloaded', 'downloading', 'hard drive', 'disk']
}
