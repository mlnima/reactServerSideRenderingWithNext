'use client';

import React, {FC, useEffect, useMemo, useState} from 'react';
import {convertVariableNameToName} from "custom-util";
import styled from "styled-components";
import {useRouter} from "next/router";
import {saveWidgetFormData} from "@store/reducers/widgetsReducer";
import {useAppDispatch} from "@store/hooks";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const FormWidgetStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

  .form-widget-the-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 300px;
  }

  .submit-button {
    border: none;
    padding: 5px 10px;
    margin-top: 5px;
    border-radius: 5px;
  }

  .after-submit-message {
    color: var(--primary-text-color,#fff);
  }

  .form-widget-field {
    width: 100%;
  }


  input, textarea {
    width: 90%;
  }

  textarea {
    min-height: 200px;
  }

  .form-widget-field-title {
    color: var(--primary-text-color,#fff);
  }
`

interface FormWidgetPropTypes {
    widgetId: string,
    uniqueData: {
        formName: string,
        formTitle: string,
        afterSubmitMessage: string,
        submitButtonText: string,
        formFields: {
            required: boolean,
            fieldType: string,
            fieldIndex: number,
            fieldPlaceHolder: string,
            fieldName: string
        }[]
    }
}

const FormWidget: FC<FormWidgetPropTypes> = ({widgetId, uniqueData}) => {

    const {locale} = useRouter()
    const dispatch = useAppDispatch()

    //@ts-ignore
    const {userId, username, role} = useSelector(({user}) => {
        return {
            userId: user?.userData?._id,
            username: user?.userData?.username,
            role: user?.userData?.role,
        }
    })

    const [state, setState] = useState(() => {
        return {
            language: locale,
            widgetId: widgetId,
            formName: uniqueData.formName,
            data: {}
        }
    })

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            data: {
                ...prevState.data,
                userId,
                username,
                role
            }
        }))
    }, [userId, username, role]);

    const [isSubmit, setIsSubmit] = useState(false)

    const onFormFieldsChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
            ...state,
            data: {
                ...state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(saveWidgetFormData(
            {
                ...state,
                date: Date.now()
            }
        ))
        setIsSubmit(true)
    }

    let formFields = useMemo(() => {
        const formFieldsInstance = [...(uniqueData?.formFields || [])]
        return formFieldsInstance?.sort((a, b) => (a.fieldIndex > b.fieldIndex) ? 1 : -1)
    }, [uniqueData?.formFields])


    const renderFields = formFields.map((field, index) => {
        const fieldAttr = {
            required: field.required ? Boolean(field.required) : false,
            placeholder: field.fieldPlaceHolder || '',
            name: field.fieldName,
            //@ts-ignore
            onChange: (e) => onFormFieldsChangeHandler(e),
        }
        return (
            <div className='form-widget-field' key={index}>
                <p className='form-widget-field-title'>{convertVariableNameToName(field.fieldName)}</p>
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
    })

    return (
        <FormWidgetStyledDiv className='form-widget'>
            {isSubmit ? <h3 className='after-submit-message'>
                    {uniqueData?.afterSubmitMessage ||
                        'We got Your message and will get back to you soon as possible'
                    }
                </h3> :
                <form onSubmit={e => onSubmitHandler(e)} className='form-widget-the-form'>
                    <h2>{uniqueData?.formTitle}</h2>
                    {renderFields}
                    <button type='submit' className='btn btn-primary submit-button'>
                        {uniqueData?.submitButtonText || 'Submit'}
                    </button>
                </form>
            }
        </FormWidgetStyledDiv>
    )

};
export default FormWidget;

