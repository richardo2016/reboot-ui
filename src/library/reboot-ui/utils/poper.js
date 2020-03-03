export function filterPlacement (placement = 'bottom-start') {
    return parsePlacement(placement).placement || 'bottom-start'
}

export function parsePlacement (placement = 'bottom-start') {
    let direction
    let axis

    switch (placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
            direction = 'top';
            axis = 'vertical';
            break;
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
            direction = 'bottom';
            axis = 'vertical';
            break;
        case 'left':
        case 'left-start':
        case 'left-end':
            direction = 'left';
            axis = 'horizontal';
            break;
        case 'right':
        case 'right-start':
        case 'right-end':
            direction = 'right';
            axis = 'horizontal';
            break;
        default:
            break
    }

    return {
        placement,
        direction,
        axis,
    }
}