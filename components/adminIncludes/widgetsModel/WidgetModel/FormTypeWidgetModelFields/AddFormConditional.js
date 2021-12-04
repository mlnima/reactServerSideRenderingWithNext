import React, {useState} from 'react';

const AddFormConditional = props => {
    const [state, setState] = useState({});

    const [fieldData, setFieldData] = useState({
        fieldName: '',
        fieldPlaceHolder: '',
        required: true,
        fieldType: 'text',
    });

    const onChangeHandler = (e) => {
        setFieldData({
            ...fieldData,
            [e.target.name]: e.target.value
        })
    }

    const onCreateFieldHandler = (e) => {
        e.preventDefault()
        props.setWidgetData(prevWidgetData=>({
            ...prevWidgetData,
            uniqueData:{
                ...(prevWidgetData?.uniqueData || {}),
                formData: {
                    ...(prevWidgetData?.uniqueData?.formData || {}),
                    formFields: [...(prevWidgetData?.uniqueData?.formData?.formFields|| []), {
                        ...fieldData,
                        fieldIndex: prevWidgetData?.uniqueData?.formData?.formFields?.length || 0,
                        filedId: prevWidgetData?.uniqueData?.formData?.formFields?.length || 0
                    }]
                }
            }
        }))
    }


    return (
        <form className='add-new-filed' onSubmit={e => onCreateFieldHandler(e)}>
            <div className={'TextInputFieldForWidget'}>
                <p>Filed Name :</p>
                <input className={'form-control-input'} type='text' required={true} name='fieldName' value={state.fieldName} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className={'TextInputFieldForWidget'}>
                <p>Place Holder :</p>
                <input className={'form-control-input'} type='text' name='fieldPlaceHolder' value={state.fieldPlaceHolder} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className={'selectFieldForWidget'}>
                <p>Required :</p>
                <select className={'custom-select'} name='required' value={state.required}>
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                </select>
            </div>
            <div className={'selectFieldForWidget'}>
                <p>Filed Type :</p>
                <select className={'custom-select'} value={state.fieldType || fieldData.fieldType} required={true} name='fieldType' onChange={e => onChangeHandler(e)}>
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
