import React, {useEffect, useState, useContext, useRef} from 'react';
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
            formData: {
                ...props.widgetData.formData,
                [e.target.name]: e.target.value
            }

        })
    }


    const formFieldsSorted = (props.widgetData?.formData?.formFields || []).sort((a, b) => (a.fieldIndex > b.fieldIndex) ? 1 : -1)


    const renderExistingFields = formFieldsSorted.map(field => {
        console.log(field)
        return (
            <FieldPreview field={field} {...props} key={field.filedId}/>
        )
    })

    if (props.rendering){
        return (
            <>
                <p>Form Name :</p>
                {/*<input name='formName' value={props.widgetData.formData.formName} onChange={e => onChangeHandler(e)}/>*/}
                <input name='formName' type='text' value={props.widgetData.formData.formName}
                            onChange={e => onChangeHandler(e)}/>
                <p>Form Title :</p>
                {/*<input name='formTitle' value={props.widgetData.formData.formTitle} onChange={e => onChangeHandler(e)}/>*/}
                <input name='formTitle' type='text' value={props.widgetData.formData.formTitle}
                             onChange={e => onChangeHandler(e)}/>
                <p>After Submit Message :</p>
                <input type='text' name='afterSubmitMessage' value={props.widgetData.formData.afterSubmitMessage}  onChange={e => onChangeHandler(e)}/>
                <p>Submit button text :</p>
                {/*<input name='submitButtonText' value={props.widgetData.formData.submitButtonText} onChange={e => onChangeHandler(e)}/>*/}
                <input name='submitButtonText' type='text' value={props.widgetData.formData.submitButtonText}
                       onChange={e => onChangeHandler(e)}/>
                <AddFormConditional state={state} setState={setState} {...props} />
                <h4>Edit Existing Fields</h4>
                {renderExistingFields}
            </>
        );
    }else return null



};
export default FormTypeWidgetModelFields;
