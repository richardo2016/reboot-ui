import { arraify } from './_base'

export function toggleCls (
    target = document.body || document.documentElement,
    classname,
    nextHas
) {
    classname = arraify(classname).filter(x => x && typeof x === 'string')

    classname.forEach(cls => {
        let _nextHas = nextHas
        if (_nextHas === undefined) {
            target.classList.toggle(cls)
            return ;
        }

        if (_nextHas) target.classList.add(cls)
        else target.classList.remove(cls)
    })
}