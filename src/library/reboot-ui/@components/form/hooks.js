import { pick, omit } from "../../../../utils/object"

const CONTROL_PROPS = [
    /**
     * @description should controlled ref use custom style
     */
    'custom',
    /**
     * @description size of controlled ref
     */
    'size',
    /**
     * @description id of controlled ref
     */
    'controlId',
    'controlAs',
    'label',
    'labelAfter',
    'controlRefParentCol',
    'controlRefParentAs',
    'controlHelp',
    'controlValidationFeedback',
]
export function useControlProps (inputProps) {
    return [
        pick(inputProps, CONTROL_PROPS),
        omit(inputProps, CONTROL_PROPS)
    ]
}
