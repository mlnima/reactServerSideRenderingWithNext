import {useEffect, useState} from 'react';
import {saveFormWidgetData} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from '../../../../_variables/_variables'

const FormWidget = props => {

    const [state, setState] = useState({
        widgetId: '',
        formName: '',
        data: {}
    })

    const [submit, setSubmit] = useState(false)

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
            data: {
                ...state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        saveFormWidgetData({
            ...state,
            date: Date.now()
        }).then(res => {
            console.log(res)
            setSubmit(true)
        })
    }


    const renderFields = (props.formData.formFields.sort((a, b) => (a.fieldIndex > b.fieldIndex) ? 1 : -1) || []).map(field => {
        if (field.fieldType === 'textarea') {
            return (
                <div className='form-widget-field' key={(props.formData.formFields || []).indexOf(field)}>
                <style jsx>{`
                    .form-widget-field{
                        width: 100%;
                    }
                    input,textarea{
                        width: 90%;
                    }
                    textarea{
                        min-height: 200px;
                    }
                    .form-widget-field-title{
                     color:var(--main-text-color);
                    }
                
                `}</style>
                    <p>{convertVariableNameToName(field.fieldName)}</p>
                    <textarea name={field.fieldName} placeholder={field.fieldPlaceHolder} required={field.required} onChange={e => onFormFieldsChangeHandler(e)}/>
                </div>
            )
        } else {
            return (
                <div className='form-widget-field' key={(props.formData.formFields || []).indexOf(field)}>
                    <style jsx>{`
                    .form-widget-field{
                        width: 100%;
                    }
                    input,textarea{
                        width: 90%;
                    }
                    textarea{
                        min-height: 200px;
                    }
                    .form-widget-field-title{
                     color:var(--main-text-color);
                    }
                
                `}</style>
                    <p className='form-widget-field-title'>{convertVariableNameToName(field.fieldName)}</p>
                    <input name={field.fieldName} type={field.fieldType} placeholder={field.fieldPlaceHolder} required={field.required} onChange={e => onFormFieldsChangeHandler(e)}/>
                </div>
            )
        }
    })

    if (submit) {
        return (
            <div className='form-widget'>
                <style jsx>{`
                    .form-widget{
                        display: flex;
                        justify-content: center;
                        padding: 10px;
                    }
                    .after-submit-message{
                        color:var(--main-text-color);
                    }
                `}</style>
                <h3 className='after-submit-message'>{props.formData.afterSubmitMessage || 'We got Your message and will get back to you soon as possible'}</h3>
            </div>
        )
    } else {
        return (
            <div className='form-widget'>
                <style jsx>{`
                    .form-widget{
                        display: flex;
                        justify-content: center;
                        padding: 10px;
                    }
                    
                    .form-widget-the-form{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        min-width: 300px;
                    }
                    .submit-button{
                        border: none;
                        padding: 5px 10px;
                        margin-top: 5px;
                        border-radius: 5px;
                    }
                `}</style>
                <form onSubmit={e => onSubmitHandler(e)} className='form-widget-the-form'>
                    <h2>{props.formData.formTitle}</h2>
                    {renderFields}
                    <button type='submit' className='submit-button'>{props.formData.submitButtonText || 'Submit'}</button>
                </form>
            </div>

        );
    }

};
export default FormWidget;
