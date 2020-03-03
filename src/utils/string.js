import { flatten, arraify } from "./array"

export function ucfirst (str = '') {
    if (typeof str !== 'string') return ''
    
    return (str[0] || '').toUpperCase() + (str.slice(1) || '')
}

export function unprefix (prefix = '/', str = '') {
    if (typeof prefix !== 'string') return str
    if (typeof str !== 'string') return ''

    if (str.slice(0, prefix.length) === prefix)
        str = str.slice(prefix.length)

    return str
}

export function prefix (prefix = '/', str = '') {
    if (typeof prefix !== 'string') return str
    if (typeof str !== 'string') return ''

    if (str.slice(0, prefix.length) !== prefix)
        str = prefix + str

    return str
}

export function flatten2trimedStrList (stringOrStrList) {
    return flatten(arraify(stringOrStrList))
        .join(' ')
        .split(' ')
        .filter(x => x && typeof x === 'string')
        .map(x => x.trim())
}