import { SVGIcon } from '../svg-icon.interface';

export const checkCircleIcon: SVGIcon = {
    name: 'check-circle',
    content: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 12.75 10.5 15l5.25-5.25M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9" fill="none"/>',
    viewBox: '0 0 24 24',
    variants: {
        'solid': '<path d="M11.999 2.2498a9.75 9.75 0 1 0 9.7499 9.7499 9.7604 9.7604 0 0 0-9.7499-9.75m4.2805 8.0305-5.2499 5.25a.75.75 0 0 1-.2434.1628.75.75 0 0 1-.5744 0 .75.75 0 0 1-.2435-.1628l-2.25-2.25a.7503.7503 0 1 1 1.0613-1.0612l1.7194 1.7203 4.7193-4.7203a.75.75 0 0 1 .8178-.1627.75.75 0 0 1 .4061.4061.751.751 0 0 1-.1627.8178"/>',
        'outline': '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 12.75 10.5 15l5.25-5.25M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9" fill="none"/>',
        'duotone': '<path fill-opacity="0.2" d="M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9"/><path stroke-linecap="round" stroke-linejoin="round" d="m8.2495 12.75 2.25 2.25 5.25-5.25m5.25 2.25c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0295-9 9-9 9 4.0294 9 9" fill="none"/>'
    },
    tags: ['todo', 'to-do', 'task', 'list', 'checkbox', 'round', 'ok', 'done']
}
