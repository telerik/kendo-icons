import { SVGIcon } from '../svg-icon.interface';

export const clockIcon: SVGIcon = {
    name: 'clock',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75V12h5.25M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M11.999 2.2485a9.75 9.75 0 1 0 9.7499 9.75 9.7604 9.7604 0 0 0-9.7499-9.75m5.2499 10.5H11.999a.7503.7503 0 0 1-.75-.75v-5.25a.75.75 0 0 1 .75-.75.75.75 0 0 1 .7499.75v4.5h4.5a.75.75 0 1 1 0 1.5"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75V12h5.25M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9"/><path stroke-linecap="round" stroke-linejoin="round" d="M11.9995 6.75V12h5.25m3.75 0c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0295-9 9-9 9 4.0294 9 9" fill="none"/>'
    },
    tags: ['times', 'timer', 'alarm', 'schedule', 'events', 'watch']
}
