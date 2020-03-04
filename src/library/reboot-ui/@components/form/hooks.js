import { pick, omit } from "../../../../utils/object"

const CONTROL_PROPS = [
    'size',
    'controlId',
    'label',
    'labelProps',
    'labelAfter',
    'labelCol',
    'controlParentCol',
    'controlParentAs',
]
export function useControlProps (inputProps) {
    return [
        pick(inputProps, CONTROL_PROPS),
        omit(inputProps, CONTROL_PROPS)
    ]
}
