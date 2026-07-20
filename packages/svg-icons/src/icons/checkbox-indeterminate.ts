import { SVGIcon } from '../svg-icon.interface';

export const checkboxIndeterminateIcon: SVGIcon = {
    name: 'checkbox-indeterminate',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 12h7.5M4.5 3.75h15a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M19.4994 2.9993H4.4995a1.5 1.5 0 0 0-1.5 1.5V19.499a1.5 1.5 0 0 0 1.5 1.5h14.9999a1.5 1.5 0 0 0 1.5-1.5V4.4993a1.5 1.5 0 0 0-1.5-1.5m-3.75 9.7499h-7.5a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75h7.5a.7497.7497 0 0 1 .75.75.7497.7497 0 0 1-.75.75"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 12h7.5M4.5 3.75h15a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M19.5 3.75h-15a.75.75 0 0 0-.75.75v15a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75v-15a.75.75 0 0 0-.75-.75"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 12.001h7.5M4.5 3.751h15a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75" fill="none"/>'
    },
    tags: ['checkbox', 'indeterminate', 'toggle', 'check', 'form']
}
