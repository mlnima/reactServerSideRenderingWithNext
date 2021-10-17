import React, { useState} from 'react';
import AddFormConditional from "./AddFormConditional";
import FieldPreview from "./FieldPreview";
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";

const FormTypeWidgetModelFields = props => {

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

        return (
            <FieldPreview field={field} {...props} key={field.filedId}/>
        )
    })

    if (props.rendering){
        return (
            <>
                <TextInputFieldForWidget inputTitle='Form Name :' name='formName' type='text' value={props.widgetData.formData?.formName} placeHolder='Form Name' onChangeHandler={e => onChangeHandler(e)}/>
                <TextInputFieldForWidget inputTitle='Form Title :' name='formTitle' type='text' value={props.widgetData.formData?.formTitle} placeHolder='Form Title' onChangeHandler={e => onChangeHandler(e)}/>
                <TextInputFieldForWidget inputTitle='After Submit Message :' name='afterSubmitMessage' type='text' value={props.widgetData.formData?.afterSubmitMessage} placeHolder='After Submit Message' onChangeHandler={e => onChangeHandler(e)}/>
                <TextInputFieldForWidget inputTitle='Submit button text :' name='submitButtonText' type='text' value={props.widgetData.formData?.submitButtonText} placeHolder='Submit button text' onChangeHandler={e => onChangeHandler(e)}/>
                <AddFormConditional state={state}
                                    setState={setState}
                                    {...props}
                />
                <h4>Edit Existing Fields</h4>
                {renderExistingFields}
            </>
        );
    }else return null
};
export default FormTypeWidgetModelFields;
