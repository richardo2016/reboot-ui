import { pick, omit } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'
import { FORM_SYMBOL_TOKEN } from "./symbols"

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
    // @TODO depreacte it 
    'controlRefParentCol',
    'controlGroupedBy',
    'controlHelp',
    'controlValidationFeedback',
    'controlValidationTooltip',
    'rbValid'
]

export function useToken (str) {
    return `${FORM_SYMBOL_TOKEN}$$${str}`
}

export function useControlProps (inputProps) {
    const controlProps = pick(inputProps, CONTROL_PROPS)
    const fieldProps = omit(inputProps, CONTROL_PROPS)

    if (controlProps.rbValid) {
        fieldProps.className = rclassnames(fieldProps, ['is-valid'])
    } else if (controlProps.rbValid === false) {
        fieldProps.className = rclassnames(fieldProps, ['is-invalid'])
    }
    delete controlProps.rbValid

    switch (fieldProps.type) {
        case 'file':
            controlProps[useToken('inputType')] = fieldProps.type
            controlProps.labelAfter = controlProps.labelAfter || controlProps.label
            delete controlProps.label
            break
        case 'checkbox':
            controlProps[useToken('inputType')] = fieldProps.type
            controlProps.labelAfter = controlProps.labelAfter || controlProps.label
            delete controlProps.label
            break
        case 'radio':
            controlProps[useToken('inputType')] = fieldProps.type
            controlProps.labelAfter = controlProps.labelAfter || controlProps.label
            delete controlProps.label
            break
    }

    return [ controlProps, fieldProps ]
}
