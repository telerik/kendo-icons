import { SVGIcon } from '../svg-icon.interface';

export const circleHalfTiltedIcon: SVGIcon = {
    name: 'circle-half-tilted',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9m0 0v-9m6.3637-6.3633L5.6362 18.3642M18 6v12.7078M15 9v11.4872M9 15v5.4872" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25M3.75 12a8.2501 8.2501 0 0 1 14.0813-5.8312L6.1688 17.8312A8.227 8.227 0 0 1 3.75 12"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9m0 0v-9m6.3637-6.3633L5.6362 18.3642M18 6v12.7078M15 9v11.4872M9 15v5.4872" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M18.3637 5.6367A9 9 0 0 1 5.6362 18.3642z"/><path stroke-linecap="round" stroke-linejoin="round" d="M18.3637 5.6367 5.6362 18.3642M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9" fill="none"/>'
    },
    tags: ['brightness', 'contrast', 'tone', 'adjust', 'hue', 'circle']
}
