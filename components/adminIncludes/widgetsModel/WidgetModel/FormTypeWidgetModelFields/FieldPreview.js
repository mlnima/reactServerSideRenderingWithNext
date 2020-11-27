import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faTrash} from "@fortawesome/free-solid-svg-icons";
import {updateWidgets,getMultipleWidgetWithData} from '../../../../../_variables/ajaxVariables'
import {AppContext} from "../../../../../context/AppContext";
import {useRouter} from "next/router";

import {faBars, faPen} from "@fortawesome/free-solid-svg-icons";

const FieldPreview = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        open:false
    });

    const [fieldData, setFieldData] = useState({
        fieldName: '',
        fieldPlaceHolder: '',
        required: true,
        fieldType: 'text',
    });



    useEffect(() => {
        setFieldData(props.field)
    }, [props.field]);

    const onDeleteHandler = name => {
        const newData = props.widgetData.formData.formFields.filter(i => i.fieldName !== name)
        props.setWidgetData({
            ...props.widgetData,
            formData: {
                ...props.widgetData.formData,
                formFields: newData
            }

        })
    }



    const onEditHandler = ()=>{
        const findIndexOfTheField = props.widgetData.formData.formFields.findIndex(f=>f.fieldName===props.field.fieldName)
        const updatedFields = [
            ...props.widgetData.formData.formFields.slice(0, findIndexOfTheField),
            fieldData,
            ...props.widgetData.formData.formFields.slice(findIndexOfTheField + 1),
        ];
        props.setWidgetData({
            ...props.widgetData,
            formData: {
                ...props.widgetData.formData,
                formFields: updatedFields
            }
        })
    }

    const onChangeHandler = (e) => {
        setFieldData({
            ...fieldData,
            [e.target.name]: e.target.value
        })
    }
    const fieldIndexPlus = plus => {
        const actionOnIndexValue = plus ? -1 : 1
        const updatedFieldData = {...props.field, fieldIndex: props.field.fieldIndex + actionOnIndexValue}
        const findIndexOfTheField = props.widgetData.formData.formFields.findIndex(f=>f.fieldName===props.field.fieldName)
        const updatedFields = [
            ...props.widgetData.formData.formFields.slice(0, findIndexOfTheField),
            updatedFieldData,
            ...props.widgetData.formData.formFields.slice(findIndexOfTheField + 1),
        ];

        props.setWidgetData({
            ...props.widgetData,
            data: {
                ...props.widgetData.data,
                formData: {
                    ...props.widgetData.formData,
                    formFields: updatedFields
                }
            }
        })

    }


     const RenderEditMode=()=>{
        if(state.open){
            return (
                <div className='edit-form-field'>
                    <form className='add-new-filed' onSubmit={e => onEditHandler(e)}>
                        <p>Filed Name :</p>
                        <input required={true} name='fieldName' value={fieldData.fieldName} onChange={e => onChangeHandler(e)}/>
                        <p>Place Holder :</p>
                        <input name='fieldPlaceHolder' value={fieldData.fieldPlaceHolder} onChange={e => onChangeHandler(e)}/>

                        <p>Required :</p>
                        <select name='required' value={fieldData.required}>
                            <option value='true'>True</option>
                            <option value='false'>False</option>
                        </select>
                        <p>Filed Type :</p>
                        <select required={true} value={fieldData.fieldType} required={true} value={fieldData.fieldType} name='fieldType' onChange={e => onChangeHandler(e)}>
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
                        <button type='submit'>Edit</button>
                    </form>
                </div>
            )
        }else return null
     }





    return (
        <div className='form-item-view'>
            <div className='field-index-control'>
                <button onClick={() => state.open?setState({...state,open:false}):setState({...state,open:true})}><FontAwesomeIcon icon={faBars} className='navigation-mobile-button-logo'/></button>
                <p>{props.field.fieldType + ' : ' + props.field.fieldName}</p>
                <p>index:{props.field.fieldIndex}</p>
                <button onClick={() => fieldIndexPlus(true)}><FontAwesomeIcon icon={faArrowUp} className='navigation-mobile-button-logo'/></button>
                <button onClick={() => fieldIndexPlus(false)}><FontAwesomeIcon icon={faArrowDown} className='navigation-mobile-button-logo'/></button>
                <button onClick={() => onDeleteHandler(props.field.fieldName)}><FontAwesomeIcon icon={faTrash} className='navigation-mobile-button-logo'/></button>
            </div>
            <RenderEditMode/>
        </div>
    );
};
export default FieldPreview;
