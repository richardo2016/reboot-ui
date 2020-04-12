export function arraify<T = any>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value]
}

export function dedupe<T = any>(list: T[]): T[] {
    if (!Array.isArray(list))
        throw new Error(`muse be list!`)

    return Array.from(new Set(list))
}

export function flatten <T = any> (listOrItem: T | T[]): T[] {
    let newList: T[] = []

    if (Array.isArray(listOrItem)) {
        listOrItem.forEach(item => {
            newList = newList.concat(flatten(item))
        })
    } else
        newList.push(listOrItem)

    return newList
}