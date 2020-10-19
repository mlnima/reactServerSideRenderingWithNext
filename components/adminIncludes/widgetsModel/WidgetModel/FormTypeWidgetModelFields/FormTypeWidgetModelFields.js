import React, {useEffect, useState, useContext, useRef} from 'react';
import './FormTypeWidgetModelFields.scss';
import AddFormConditional from "./AddFormConditional";
import {DelayInput} from "react-delay-input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faBars} from "@fortawesome/free-solid-svg-icons";
import {getMultipleWidgetWithData, updateWidgets} from "../../../../../_variables/ajaxVariables";
import {AppContext} from "../../../../../context/AppContext";
import FieldPreview from "./FieldPreview";

const FormTypeWidgetModelFields = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        formName: '',
        submitButtonText: 'submit',
        formFields: []
    });

    const onChangeHandler = (e) => {
        props.setWidgetData({
            ...props.widgetData,
            data: {
                ...props.widgetData.data,
                formData: {
                    ...props.widgetData.data.formData,
                    [e.target.name]: e.target.value
                }
            }

        })
    }
    // useEffect(() => {
    //     console.log(props)
    // }, [props]);

    const onDeleteHandler = name => {
        const newData = props.widgetData.data.formData.formFields.filter(i => i.fieldName !== name)
        props.setWidgetData({
            ...props.widgetData,
            data: {
                ...props.widgetData.data,
                formData: {
                    ...props.widgetData.data.formData,
                    formFields: newData
                }
            }

        })
    }

    const formFieldsSorted = (props.widgetData.data.formData.formFields || []).sort((a, b) => (a.fieldIndex > b.fieldIndex) ? 1 : -1)



    const renderExistingFields = formFieldsSorted.map(field => {
        // const fieldIndexPlus = plus => {
        //     const actionOnIndexValue = plus ? -1 : 1
        //     const updatedFieldData = {...field, fieldIndex: field.fieldIndex + actionOnIndexValue}
        //
        //     const newFieldsData = (props.widgetData.data.formData.formFields || []).map(fieldToUpdate => {
        //         if (fieldToUpdate.fieldName === updatedFieldData.fieldName ) {
        //             return updatedFieldData
        //         } else return fieldToUpdate
        //     })
        //
        //     const newWidgetDataToSave = {
        //         ...props.widgetData,
        //         data: {
        //             ...props.widgetData.data,
        //             formData: {
        //                 ...props.widgetData.data.formData,
        //                 formFields: newFieldsData
        //             }
        //         }
        //     }
        //   //  console.log(newWidgetDataToSave.data.formData.formFields)
        //     console.log(newFieldsData)
        //     // updateWidgets(newWidgetDataToSave).then(() => {
        //     //     getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
        //     //         // console.log(res.data)
        //     //         contextData.dispatchWidgetsSettings({
        //     //             widgets: [...res.data.widgets]
        //     //         })
        //     //
        //     //     })
        //     // })
        //
        //     // console.log(newFieldsData)
        //     // props.setWidgetData({
        //     //     ...props.widgetData,
        //     //     data: {
        //     //         ...props.widgetData.data,
        //     //         formData: {
        //     //             ...props.widgetData.data.formData,
        //     //             formFields: newFieldsData
        //     //         }
        //     //     }
        //     // })
        //
        // }
        return (
            <FieldPreview field={field} {...props}/>
            // <div className='form-item-view'>
            //     <div className='field-index-control'>
            //         <button onClick={() => fieldIndexPlus(true)}><FontAwesomeIcon icon={faArrowUp} className='navigation-mobile-button-logo'/></button>
            //         <button onClick={() => fieldIndexPlus(false)}><FontAwesomeIcon icon={faArrowDown} className='navigation-mobile-button-logo'/></button>
            //         <p>{field.fieldName + ' ' + field.fieldType}</p>
            //     </div>
            //
            //     <button onClick={() => onDeleteHandler(field.fieldName)}>Delete</button>
            // </div>
        )
    })

    return (
        <>
            <p>Form Name :</p>
            {/*<input name='formName' value={props.widgetData.data.formData.formName} onChange={e => onChangeHandler(e)}/>*/}
            <DelayInput name='formName' type='text' value={props.widgetData.data.formData.formName}
                        delayTimeout={2000} onChange={e => onChangeHandler(e)}/>
            <p>Form Title :</p>
            {/*<input name='formTitle' value={props.widgetData.data.formData.formTitle} onChange={e => onChangeHandler(e)}/>*/}
            <DelayInput name='formTitle' type='text' value={props.widgetData.data.formData.formTitle}
                        delayTimeout={2000} onChange={e => onChangeHandler(e)}/>
            <p>After Submit Message :</p>
            <DelayInput type='text' name='afterSubmitMessage' value={props.widgetData.data.formData.afterSubmitMessage} delayTimeout={2000} onChange={e => onChangeHandler(e)}/>
            <p>Submit button text :</p>
            {/*<input name='submitButtonText' value={props.widgetData.data.formData.submitButtonText} onChange={e => onChangeHandler(e)}/>*/}
            <DelayInput name='submitButtonText' type='text' value={props.widgetData.data.formData.submitButtonText}
                        delayTimeout={2000} onChange={e => onChangeHandler(e)}/>
            <AddFormConditional state={state} setState={setState} {...props} />
            {renderExistingFields}
        </>
    );
};
export default FormTypeWidgetModelFields;
