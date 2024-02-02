import React, {FC} from "react";
import './FormWidgetField.styles.scss'
import {convertVariableNameToName} from "custom-util";

interface IProps {
    field: {
        [key: string]: any
    },
    dictionary: {
        [key: string]: string
    },
    onFormFieldsChangeHandler: (e: any) => void;
    state: {
        [key: string]: any
    }
}

const FormWidgetField: FC<IProps> = ({field, dictionary, onFormFieldsChangeHandler, state}) => {
    return (
        <div className='formWidgetField'>
            <p className='formWidgetFieldTitle'>
                {convertVariableNameToName(field.fieldName)}
            </p>
            {field.fieldType === 'textarea' ?
                <textarea className={'primaryInput'}
                          required={field.required ? Boolean(field.required) : false}
                          placeholder={dictionary?.[field.fieldPlaceHolder] || field.fieldPlaceHolder || ''}
                          value={state?.data?.[field?.fieldName]||''}
                          name={field.fieldName}
                          onChange={(e: any) => onFormFieldsChangeHandler(e)}
                /> :
                <input className={'primaryInput'}
                       required={field.required ? Boolean(field.required) : false}
                       placeholder={dictionary?.[field.fieldPlaceHolder] || field.fieldPlaceHolder || ''}
                       value={state?.data?.[field?.fieldName]||''}
                       name={field.fieldName}
                       onChange={(e: any) => onFormFieldsChangeHandler(e)}
                       type={field.fieldType || 'text'}
                />
            }
        </div>
    )
};
export default FormWidgetField
