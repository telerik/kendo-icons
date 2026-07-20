import { SVGIcon } from '../svg-icon.interface';

export const textClipIcon: SVGIcon = {
    name: 'text-clip',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3.75v16.5M7.125 12h9.75m-3 3 3-3-3-3m7.875-5.25v16.5" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path fill-rule="evenodd" d="M21 1.5c.8284 0 1.5.6716 1.5 1.5v18c0 .8284-.6716 1.5-1.5 1.5H3c-.8284 0-1.5-.6716-1.5-1.5V3c0-.8284.6716-1.5 1.5-1.5zM4.5 5.1748a.75.75 0 0 0-.75.75v12.1504c.0002.414.336.75.75.75s.7498-.336.75-.75V5.9248a.75.75 0 0 0-.75-.75m15 0a.75.75 0 0 0-.75.75v12.1504c.0002.414.3359.75.75.75a.7503.7503 0 0 0 .75-.75V5.9248a.75.75 0 0 0-.75-.75m-5.5693 3.9375a.751.751 0 0 0-1.0616 0 .7506.7506 0 0 0 0 1.0606l1.0772 1.0771H8.2432a.75.75 0 0 0 0 1.5h5.7021l-1.0762 1.0762c-.2926.2927-.2924.7676 0 1.0605a.751.751 0 0 0 1.0616 0l2.3564-2.3564a.7499.7499 0 0 0 0-1.0606z" clip-rule="evenodd"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3.75v16.5M7.125 12h9.75m-3 3 3-3-3-3m7.875-5.25v16.5" fill="none"/>',
        'duotone': '<rect width="19.4993" height="16.5" x="2.251" y="3.7539" fill-opacity="0.2" rx="0.75"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3.75v16.5M7.125 12h9.75m-3 3 3-3-3-3m7.875-5.25v16.5" fill="none"/>'
    },
    tags: ['text', 'clip', 'text-formatting', 'typography', 'font', 'writing']
}
