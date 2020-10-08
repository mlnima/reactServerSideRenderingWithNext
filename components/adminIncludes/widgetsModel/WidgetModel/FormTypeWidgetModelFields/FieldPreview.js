import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {updateWidgets,getMultipleWidgetWithData} from '../../../../../_variables/ajaxVariables'
import {AppContext} from "../../../../../context/AppContext";
import {useRouter} from "next/router";

const FieldPreview = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);

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


    const fieldIndexPlus = plus => {
        const actionOnIndexValue = plus ? -1 : 1
        const updatedFieldData = {...props.field, fieldIndex: props.field.fieldIndex + actionOnIndexValue}
        const findIndexOfTheField = props.widgetData.data.formData.formFields.findIndex(f=>f.fieldName===props.field.fieldName)
        const updatedFields = [
            ...props.widgetData.data.formData.formFields.slice(0, findIndexOfTheField),
            updatedFieldData,
            ...props.widgetData.data.formData.formFields.slice(findIndexOfTheField + 1),
        ];
        console.log(updatedFields)
        // console.log(findIndexOfTheField)

        // const newWidgetDataToSave = {
        //     ...props.widgetData,
        //     data: {
        //         ...props.widgetData.data,
        //         formData: {
        //             ...props.widgetData.data.formData,
        //             formFields: updatedFields
        //         }
        //     }
        // }
        //  console.log(newWidgetDataToSave.data.formData.formFields)
        // console.log(newFieldsData)
        // updateWidgets(newWidgetDataToSave).then(() => {
        //     getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
        //         // console.log(res.data)
        //         contextData.dispatchWidgetsSettings({
        //             widgets: [...res.data.widgets]
        //         })
        //         router.push(router.pathname)
        //     })
        // })

        // console.log(newFieldsData)
        props.setWidgetData({
            ...props.widgetData,
            data: {
                ...props.widgetData.data,
                formData: {
                    ...props.widgetData.data.formData,
                    formFields: updatedFields
                }
            }
        })

    }



    return (
        <div className='form-item-view'>
            <div className='field-index-control'>
                <button onClick={() => fieldIndexPlus(true)}><FontAwesomeIcon icon={faArrowUp} className='navigation-mobile-button-logo'/></button>
                <button onClick={() => fieldIndexPlus(false)}><FontAwesomeIcon icon={faArrowDown} className='navigation-mobile-button-logo'/></button>
                <p>{props.field.fieldName + ' ' + props.field.fieldType}</p>
            </div>

            <button onClick={() => onDeleteHandler(props.field.fieldName)}>Delete</button>
        </div>
    );
};
export default FieldPreview;
