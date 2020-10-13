import React, {useEffect, useState, useContext, useRef} from 'react';

const AddFormConditional = props => {
    const [state, setState] = useState({});

    const [fieldData, setFieldData] = useState({
        fieldName: '',
        fieldPlaceHolder: '',
        required: true,
        fieldType: 'text',

    });


    // useEffect(() => {
    //     setState({
    //         ...state,
    //         fieldIndex : props.state.formFields.length
    //     })
    // }, []);


    const onChangeHandler = (e) => {
        setFieldData({
            ...fieldData,
            [e.target.name]: e.target.value
        })
    }

    const onCreateFieldHandler = (e) => {
        e.preventDefault()
        props.setWidgetData({
            ...props.widgetData,
            data: {
                ...props.widgetData.data,
                formData: {
                    ...props.widgetData.data.formData,
                    formFields: [...props.widgetData.data.formData.formFields, {
                        ...fieldData,
                        fieldIndex : props.state.formFields.length
                    }]
                }
            }

        })
    }


    return (
        <form className='add-new-filed' onSubmit={e => onCreateFieldHandler(e)}>
            <p>Filed Name :</p>
            <input required={true} name='fieldName' value={state.fieldName} onChange={e => onChangeHandler(e)}/>
            <p>Place Holder :</p>
            <input name='fieldPlaceHolder' value={state.fieldPlaceHolder} onChange={e => onChangeHandler(e)}/>
            <p>Required :</p>
            <select name='required' value={state.required}>
                <option value='true'>True</option>
                <option value='false'>False</option>
            </select>
            <p>Filed Type :</p>
            <select required={true} value={state.fieldType} required={true} value={fieldData.fieldType} name='fieldType' onChange={e => onChangeHandler(e)}>
                <option>Select</option>
                <option value='textarea'>Text Area</option>
                <option value='text'>Text</option>
                {/*<option value='button'>Number</option>*/}
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
            <button type='submit'>Add</button>
        </form>
    );
};
export default AddFormConditional;
