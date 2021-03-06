import { arraify } from "./array";

export function omit (
    obj: {[k: string]: any},
    keys: (keyof typeof obj)[] = []
) {
    keys = arraify(keys).filter(x => x && typeof x === 'string')
    
    const _set = new Set(keys)
    const newObj: typeof obj = {}
    for (let k in obj) {
        if (_set.has(k)) continue ;
        newObj[k] = obj[k]
    }

    return newObj
}

export function pick (
    obj: {[k: string]: any},
    keys: (keyof typeof obj)[] = []
) {
    keys = arraify(keys).filter(x => x && typeof x === 'string')
    
    const _set = new Set(keys)
    const newObj: typeof obj = {}
    for (let k in obj) {
        if (!_set.has(k)) continue ;
        newObj[k] = obj[k]
    }

    return newObj
}