export function filterPlacement (placement = 'bottom-start') {
    switch (placement) {
        case 'top-start':
        case 'top-end':
        case 'top':
        case 'bottom-start':
        case 'bottom-end':
        case 'bottom':
        case 'left-start':
        case 'left-end':
        case 'left':
        case 'right-start':
        case 'right-end':
        case 'right':
            break;
        default:
            placement = 'bottom-start'
            break
    }

    return placement
}