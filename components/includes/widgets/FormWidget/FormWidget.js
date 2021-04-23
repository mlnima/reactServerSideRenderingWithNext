import React, {useEffect, useState, useContext, useRef} from 'react';
import {saveFormWidgetData} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import styled from "styled-components";

let StyledDiv = styled.div`
  display: flex;
  justify-content: center;

  padding: 10px;
  form{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 300px;
    .submit-button{
      border: none;
      padding: 5px 10px;
      margin-top: 5px;
      border-radius: 5px;
    }
    .form-widget-field{
      width: 100%;
      input,textarea{
        width: 90%;
      }
      textarea{
        min-height: 200px;
      }
    }

  }
`
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
                    <p>{convertVariableNameToName(field.fieldName)}</p>
                    <textarea name={field.fieldName} placeholder={field.fieldPlaceHolder} required={field.required} onChange={e => onFormFieldsChangeHandler(e)}/>
                </div>
            )
        } else {
            return (
                <div className='form-widget-field' key={(props.formData.formFields || []).indexOf(field)}>
                    <p>{convertVariableNameToName(field.fieldName)}</p>
                    <input name={field.fieldName} type={field.fieldType} placeholder={field.fieldPlaceHolder} required={field.required} onChange={e => onFormFieldsChangeHandler(e)}/>
                </div>
            )
        }
    })

    if (submit) {
        return (
            <StyledDiv className='form-widget'>
                <h3>{props.formData.afterSubmitMessage || 'We got Your message and will get back to you soon as possible'}</h3>
            </StyledDiv>
        )
    } else {
        return (
            <StyledDiv className='form-widget'>
                <form onSubmit={e => onSubmitHandler(e)}>
                    <h2>{props.formData.formTitle}</h2>
                    {renderFields}
                    <button type='submit' className='submit-button'>{props.formData.submitButtonText || 'Submit'}</button>
                </form>
            </StyledDiv>

        );
    }

};
export default FormWidget;
