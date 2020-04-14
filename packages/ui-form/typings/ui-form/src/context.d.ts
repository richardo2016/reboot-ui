import React from 'react';
import { RebootUI } from '@reboot-ui/common';
export declare type FormContextType = {
    inline: boolean;
    novalidate: boolean;
    getFormHTMLElement: () => RebootUI.Nilable<HTMLFormElement>;
    getValidity: () => boolean;
};
export declare const FormContext: React.Context<FormContextType>;
export declare type FormGroupContextType = {
    inFormGroup: boolean;
};
export declare const FormGroupContext: React.Context<FormGroupContextType>;
export declare type FormControlContextType = {
    inFormContrl: boolean;
    label: React.ReactNode;
    controlId: string;
    custom: boolean;
    size?: RebootUI.BinarySizeType;
    labelBefore: string | boolean;
    labelAfter: string | boolean;
};
export declare const FormControlContext: React.Context<FormControlContextType>;
