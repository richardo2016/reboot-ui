function padStart (input = '', len = 2, fill = '0') {
    input = input + ''
    
    while (input.length < len)
        input = fill + input

    return input
}

exports.formatTime = function (now = new Date()) {
    const arr = [
        padStart(now.getFullYear(), 4), '-',
        padStart(now.getMonth() + 1, 2), '-',
        padStart(now.getDay(), 2), ' ',
        padStart(now.getHours(), 2), ':',
        padStart(now.getMinutes(), 2), ':',
        padStart(now.getSeconds(), 2),
    ]

    return arr.join('')
}