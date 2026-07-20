import { SVGIcon } from '../svg-icon.interface';

export const loginIcon: SVGIcon = {
    name: 'login',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12h10.5M9 15.75 12.75 12 9 8.25m3.75-4.5h6v16.5h-6" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="m13.2796 12.532-3.75 3.75a.7501.7501 0 0 1-1.2806-.5306v-3h-6a.7498.7498 0 0 1-.5303-1.2803.75.75 0 0 1 .5303-.2197h6v-3a.75.75 0 0 1 1.2806-.5306l3.75 3.75a.75.75 0 0 1 0 1.0612m5.4693-9.5305h-6a.75.75 0 0 0 0 1.5h5.25v14.9998h-5.25a.7503.7503 0 0 0-.75.75.7502.7502 0 0 0 .75.75h6a.75.75 0 0 0 .75-.75V3.7515a.75.75 0 0 0-.75-.75"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12h10.5M9 15.75 12.75 12 9 8.25m3.75-4.5h6v16.5h-6" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M3.75 3.75h15v16.5h-15a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.2495 12h10.5m-3.75 3.75 3.75-3.75-3.75-3.75m3.75-4.5h6v16.5h-6" fill="none"/>'
    },
    tags: ['login', 'actions']
}
