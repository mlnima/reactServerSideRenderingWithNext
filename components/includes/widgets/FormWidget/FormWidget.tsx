import {FC, useState} from 'react';
import convertVariableNameToName from "../../../../_variables/util/convertVariableNameToName";
import styled from "styled-components";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {saveFormData} from "@store/clientActions/clientWidgetsActions";

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
    color: var(--main-text-color);
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
    color: var(--main-text-color);
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
    const dispatch = useDispatch()

    const [state, setState] = useState(() => {
        return {
            language: locale,
            widgetId: widgetId,
            formName: uniqueData.formName,
            data: {}
        }
    })

    const [submit, setSubmit] = useState(false)

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
        dispatch(saveFormData(
            {
                ...state,
                date: Date.now()
            }
        ))
        setSubmit(true)
        // saveFormWidgetData({
        //     ...state,
        //     date: Date.now()
        // }).then(res => {
        //     setSubmit(true)
        // })
    }

    const renderFields = ((uniqueData?.formFields || [])
        .sort((a, b) => (a.fieldIndex > b.fieldIndex) ? 1 : -1) || [])
        .map(field => {
            const fieldAttr = {
                required: field.required ? Boolean(field.required) : false,
                placeholder: field.fieldPlaceHolder || '',
                name: field.fieldName,
                onChange: (e) => onFormFieldsChangeHandler(e),
            }
            return (
                <div className='form-widget-field' key={(uniqueData?.formFields || []).indexOf(field)}>
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

    if (submit) {
        return (
            <FormWidgetStyledDiv className='form-widget'>
                <h3 className='after-submit-message'>
                    {uniqueData?.afterSubmitMessage ||
                    'We got Your message and will get back to you soon as possible'
                    }
                </h3>
            </FormWidgetStyledDiv>
        )
    } else {
        return (
            <FormWidgetStyledDiv className='form-widget'>
                <form onSubmit={e => onSubmitHandler(e)} className='form-widget-the-form'>
                    <h2>{uniqueData?.formTitle}</h2>
                    {renderFields}
                    <button type='submit' className='btn btn-primary'>
                        {uniqueData?.submitButtonText || 'Submit'}
                    </button>
                </form>
            </FormWidgetStyledDiv>

        );
    }

};
export default FormWidget;
