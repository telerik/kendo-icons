import { SVGIcon } from '../svg-icon.interface';

export const mapPinIcon: SVGIcon = {
    name: 'map-pin',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 12.1509c2.4853 0 4.5-2.0147 4.5-4.5s-2.0147-4.5-4.5-4.5-4.5 2.0147-4.5 4.5 2.0147 4.5 4.5 4.5m0 0v8.25" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M12 2.4004c2.8994 0 5.25 2.3515 5.25 5.251-.0002 2.6445-1.9561 4.8313-4.5 5.1953v7.5547a.7506.7506 0 0 1-.75.75c-.4141 0-.7497-.336-.75-.75v-7.5547c-2.544-.364-4.4998-2.5508-4.5-5.1953 0-2.8995 2.3505-5.251 5.25-5.251"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 12.1509c2.4853 0 4.5-2.0147 4.5-4.5s-2.0147-4.5-4.5-4.5-4.5 2.0147-4.5 4.5 2.0147 4.5 4.5 4.5m0 0v8.25" fill="none"/>',
        'duotone': '<circle cx="12" cy="7.6509" r="4.5" fill-opacity="0.2"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 12.1509c2.4853 0 4.5-2.0147 4.5-4.5s-2.0147-4.5-4.5-4.5-4.5 2.0147-4.5 4.5 2.0147 4.5 4.5 4.5m0 0v8.25" fill="none"/>'
    },
    tags: ['maps', 'places', 'markers', 'pins', 'locations', 'poi', 'point of interest']
}
