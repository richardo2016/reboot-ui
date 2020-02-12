export function arraify(value) {
    return Array.isArray(value) ? value : [value]
}

export function dedupe(list) {
    if (!Array.isArray(list))
        throw new Error(`muse be list!`)

    return Array.from(new Set(list))
}