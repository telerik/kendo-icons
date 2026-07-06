import { SVGIcon } from '../svg-icon.interface';

export const gridIcon: SVGIcon = {
    name: 'grid',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15M4.5 12h15M5.25 4.5h13.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M20.2489 5.248v5.625a.375.375 0 0 1-.375.375h-7.125V4.123a.375.375 0 0 1 .375-.375h5.625a1.5 1.5 0 0 1 1.5 1.5m-9.375-1.5h-5.625a1.5 1.5 0 0 0-1.5 1.5v5.625a.3753.3753 0 0 0 .375.375h7.125V4.123a.375.375 0 0 0-.375-.375m9 9h-7.125v7.1249a.3747.3747 0 0 0 .375.375h5.625a1.5 1.5 0 0 0 1.5-1.5V13.123a.3747.3747 0 0 0-.375-.375m-16.125.375v5.6249a1.5 1.5 0 0 0 1.5 1.5h5.625a.375.375 0 0 0 .375-.375V12.748h-7.125a.375.375 0 0 0-.375.375"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15M4.5 12h15M5.25 4.5h13.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M18.75 4.5H5.25a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h13.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15M4.5 12h15M5.25 4.5h13.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75" fill="none"/>'
    },
    tags: ['grid', 'layout', 'tiles', 'view']
}
