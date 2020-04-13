import React from 'react'
import { RebootUI } from '@reboot-ui/common'

export type FormContextType = {
    inline: boolean
    novalidate: boolean
    getFormHTMLElement: () => RebootUI.Nilable<HTMLFormElement>
    getValidity: () => boolean
}
export const FormContext = React.createContext<FormContextType>({} as FormContextType)

export type FormGroupContextType = {
    inFormGroup: boolean
}
export const FormGroupContext = React.createContext<FormGroupContextType>({} as FormGroupContextType)

export type FormControlContextType = {
    inFormContrl: boolean
    label: React.ReactNode
    controlId: string
    custom: boolean
    size?: RebootUI.BinarySizeType
    labelBefore: string | boolean
    labelAfter: string | boolean
}
export const FormControlContext = React.createContext<FormControlContextType>({} as FormControlContextType)