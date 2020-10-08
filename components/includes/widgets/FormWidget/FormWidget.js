import React, {useEffect, useState, useContext, useRef} from 'react';
import {saveFormWidgetData} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import './FormWidget.scss';

const FormWidget = props => {

    const [state, setState] = useState({
        widgetId: '',
        formName: '',
        data: {}
    })


    useEffect(() => {
        if (props.id) {
            setState({
                ...state,
                widgetId: props.id,
                formName: props.formData.formName
            })
        }
    }, [props]);


    const onFormFieldsChangeHandler = e => {
        setState({
            ...state,
            data:{
                ...state.data,
                [e.target.name]:e.target.value
            }
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        saveFormWidgetData({
            ...state,
            date:Date.now()
        }).then(res=>{
            console.log(res)
        })
    }

    const renderFields = (props.formData.formFields || []).map(field => {
        if (field.fieldType === 'textarea') {
            return (
                <div className='form-widget-field' key={(props.formData.formFields || []).indexOf(field)}>
                    <p>{convertVariableNameToName(field.fieldName)}</p>
                    <textarea name={field.fieldName} placeholder={field.fieldPlaceHolder} required={field.required} onChange={e=>onFormFieldsChangeHandler(e)}/>
                </div>
            )
        } else {
            return (
                <div className='form-widget-field' key={(props.formData.formFields || []).indexOf(field)}>
                    <p>{convertVariableNameToName(field.fieldName)}</p>
                    <input name={field.fieldName} type={field.fieldType} placeholder={field.fieldPlaceHolder} required={field.required} onChange={e=>onFormFieldsChangeHandler(e)}/>
                </div>
            )
        }
    })

    return (
        <div className='form-widget'>
            <form onSubmit={e=>onSubmitHandler(e)}>
                <h2>{props.formData.formTitle}</h2>
                {renderFields}
                <button type='submit' className='submit-button'>{props.formData.submitButtonText || 'Submit'}</button>
            </form>
        </div>

    );
};
export default FormWidget;
