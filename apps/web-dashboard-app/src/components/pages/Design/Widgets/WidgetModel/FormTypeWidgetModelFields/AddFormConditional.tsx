// @ts-nocheck
import React, {FC, useState} from 'react';
import inputValueSimplifier from "custom-util/src/inputsUtils/inputValueSimplifier";

interface AddFormConditionalPropTypes{
    setWidgetData:React.SetStateAction<any>
}

interface AddFormConditionalState {
    fieldName: string,
    fieldPlaceHolder: string,
    required: boolean,
    fieldType: string,
    fieldIndex:number
}

const AddFormConditional:FC<AddFormConditionalPropTypes> = ({setWidgetData}) => {

    const [fieldData, setFieldData] = useState<AddFormConditionalState>({
        fieldName: '',
        fieldPlaceHolder: '',
        required: true,
        fieldType: 'text',
        fieldIndex:0
    });

    const onChangeHandler = (e) => {
        const value =  inputValueSimplifier(e)
        setFieldData({
            ...fieldData,
            [e.target.name]: value
        })
    }

    const onCreateFieldHandler = (e) => {
        e.preventDefault()
        setWidgetData(prevWidgetData=>({
            ...prevWidgetData,
            uniqueData:{
                ...(prevWidgetData?.uniqueData || {}),
                    formFields: [...(prevWidgetData?.uniqueData?.formFields|| []), {
                        ...fieldData,
                        fieldIndex: fieldData.fieldIndex || prevWidgetData?.uniqueData?.formFields?.length || 0,
                        filedId: prevWidgetData?.uniqueData?.formFields?.length || 0
                    }]
            }
        }))
    }


    return (
        <form className='add-new-filed' onSubmit={e => onCreateFieldHandler(e)}>
            <div className={'TextInputFieldForWidget'}>
                <p>Filed Name :</p>
                <input className={'form-control-input'} type='text' required={true} name='fieldName' value={fieldData.fieldName} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className={'TextInputFieldForWidget'}>
                <p>Place Holder :</p>
                <input className={'form-control-input'} type='text' name='fieldPlaceHolder' value={fieldData.fieldPlaceHolder} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className={'TextInputFieldForWidget'}>
                <p>Index :</p>

                <input className={'form-control-input'} type='number' name='fieldIndex' value={fieldData.fieldIndex} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className={'selectFieldForWidget'}>
                <p>Required :</p>
                <select className={'custom-select'} name='required' value={JSON.stringify(fieldData.required) } required={true} onChange={e => onChangeHandler(e)}>
                    <option value='' >Select</option>
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                </select>
            </div>
            <div className={'selectFieldForWidget'}>
                <p>Filed Type :</p>

                <select className={'custom-select'} value={fieldData.fieldType} required={true} name='fieldType' onChange={e => onChangeHandler(e)}>
                    <option>Select</option>
                    <option value='textarea'>Text Area</option>
                    <option value='text'>Text</option>
                    <option value='button'>Number</option>
                    <option value='email'>Email</option>
                    <option value='checkbox'>CheckBox</option>
                    <option value='color'>Color</option>
                    <option value='date'>date</option>
                    <option value='email'>email</option>
                    <option value='number'>number</option>
                    <option value='radio'>radio</option>
                    <option value='range'>range</option>
                    <option value='tel'>tel</option>
                    <option value='time'>time</option>
                    <option value='url'>url</option>
                </select>
            </div>
            <button className='btn btn-secondary' type='submit'>
                Add
            </button>
        </form>
    );
};
export default AddFormConditional;
