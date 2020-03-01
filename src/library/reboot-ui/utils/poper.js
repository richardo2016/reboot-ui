export function filterPlacement (placement = 'bottom-start') {
    return parsePlacement(placement).placement || 'bottom-start'
}

export function parsePlacement (placement = 'bottom-start') {
    let direction
    switch (placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
            direction = 'top'; break;
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
            direction = 'bottom'; break;
        case 'left':
        case 'left-start':
        case 'left-end':
            direction = 'left'; break;
        case 'right':
        case 'right-start':
        case 'right-end':
            direction = 'right'; break;
        default:
            break
    }

    return {
        placement,
        direction
    }
}