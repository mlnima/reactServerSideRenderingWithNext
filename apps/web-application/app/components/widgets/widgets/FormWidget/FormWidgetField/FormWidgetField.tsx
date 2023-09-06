import React, {FC} from "react";
import './FormWidgetField.styles.scss'
import {convertVariableNameToName} from "custom-util";

interface IProps {
    field:{
        [key:string]:any
    },
    dictionary: {
        [key: string]: string
    },
    onFormFieldsChangeHandler:(e:any)=>void;
}

const FormWidgetField: FC<IProps> = ({field,dictionary,onFormFieldsChangeHandler}) => {
    const fieldAttr = {
        required: field.required ? Boolean(field.required) : false,
        placeholder: dictionary?.[field.fieldPlaceHolder] || field.fieldPlaceHolder || '',
        name: field.fieldName,
        onChange: (e:any) => onFormFieldsChangeHandler(e),
    }
    return (
        <div className='formWidgetField'>
            <p className='formWidgetFieldTitle'>
                {convertVariableNameToName(field.fieldName)}
            </p>
            {field.fieldType === 'textarea' ?
                <textarea className={'form-control-input'}
                          {...fieldAttr}
                /> :
                <input className={'form-control-input'}
                       {...fieldAttr}
                       type={field.fieldType || 'text'}
                />
            }
        </div>
    )
};
export default FormWidgetField
