import { SVGIcon } from '../svg-icon.interface';

export const linePointRhombusIcon: SVGIcon = {
    name: 'line-point-rhombus',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.8585 11.9993h11.1428M6.9323 8.8177l3.182 3.182-3.182 3.1819-3.182-3.1819z" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.4826 11.9996h11.1428M6.5564 8.818 9.7385 12l-3.182 3.182L3.3746 12z" fill="none"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.8585 11.9993h11.1428M6.9323 8.8177l3.182 3.182-3.182 3.1819-3.182-3.1819z" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M6.5565 8.818 9.7385 12l-3.182 3.182L3.3745 12z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.4826 11.9996h11.1428M6.5564 8.818 9.7384 12l-3.182 3.182L3.3744 12z" fill="none"/>'
    }
}
