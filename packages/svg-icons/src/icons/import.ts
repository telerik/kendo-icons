import { SVGIcon } from '../svg-icon.interface';

export const importIcon: SVGIcon = {
    name: 'import',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 13.5V3M8.25 9.75 12 13.5l3.75-3.75m4.5 3.75v6H3.75v-6" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.9989 13.4999v6a.75.75 0 0 1-.75.75H3.749a.75.75 0 0 1-.75-.75v-6a.7499.7499 0 1 1 1.5 0v5.25H19.499v-5.25a.7497.7497 0 0 1 .75-.75.7497.7497 0 0 1 .75.75m-9.5306.5306a.75.75 0 0 0 .2435.1628.749.749 0 0 0 .5744 0 .75.75 0 0 0 .2434-.1628l3.7499-3.7499a.75.75 0 0 0 .1629-.8178A.75.75 0 0 0 15.7489 9h-3V3a.75.75 0 0 0-.7499-.75.75.75 0 0 0-.75.75v6h-3a.75.75 0 0 0-.5306 1.2806z"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 13.5V3M8.25 9.75 12 13.5l3.75-3.75m4.5 3.75v6H3.75v-6" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M5.25 3h13.5a1.5 1.5 0 0 1 1.5 1.5v15H3.75v-15A1.5 1.5 0 0 1 5.25 3"/><path stroke-linecap="round" stroke-linejoin="round" d="M11.9995 13.5V3m-3.75 6.75 3.75 3.75 3.75-3.75m4.5 3.75v6h-16.5v-6" fill="none"/>'
    },
    tags: ['import', 'actions', 'upload', 'load', 'input']
}
