import React, { useState} from 'react';
import AddFormConditional from "./AddFormConditional";
import FieldPreview from "./FieldPreview";
import TextInputFieldForWidget from "../TextInputFieldForWidget/TextInputFieldForWidget";
import styled from "styled-components";

const FormTypeWidgetModelFieldsStyledDiv = styled.div`
  .add-new-filed{
   // border: var( --default-border);
    padding: 20px 0;
  }
`
const FormTypeWidgetModelFields = props => {

    const [state, setState] = useState({
        formName: '',
        submitButtonText: 'submit',
        formFields: []
    });

    const formFieldsSorted = (props.widgetData?.uniqueData?.formFields || []).sort((a, b) => (a.fieldIndex > b.fieldIndex) ? 1 : -1)

    const renderExistingFields = formFieldsSorted.map(field => {
        return (
            <FieldPreview field={field} {...props} key={field.filedId}/>
        )
    })

    const onChangeHandler = e =>{
        props.setWidgetData(prevWidgetData=>({
            ...prevWidgetData,
            uniqueData:{
                ...(prevWidgetData?.uniqueData || {}),
                [e.target.name]: e.target.value
            }
        }))
    }



    return (
        <FormTypeWidgetModelFieldsStyledDiv>
            <TextInputFieldForWidget inputTitle='Form Name :' name='formName' type='text' value={props.widgetData?.uniqueData?.formName} placeHolder='Form Name' onChangeHandler={e => onChangeHandler(e)}/>
            <TextInputFieldForWidget inputTitle='Form TextInput :' name='formTitle' type='text' value={props.widgetData?.uniqueData?.formTitle} placeHolder='Form TextInput' onChangeHandler={e => onChangeHandler(e)}/>
            <TextInputFieldForWidget inputTitle='After Submit Message :' name='afterSubmitMessage' type='text' value={props.widgetData?.uniqueData?.afterSubmitMessage} placeHolder='After Submit Message' onChangeHandler={e => onChangeHandler(e)}/>
            <TextInputFieldForWidget inputTitle='Submit button text :' name='submitButtonText' type='text' value={props.widgetData?.uniqueData?.submitButtonText} placeHolder='Submit button text' onChangeHandler={e => onChangeHandler(e)}/>
            <AddFormConditional state={state}
                                setState={setState}
                                {...props}
            />
            <h4>Edit Existing Fields</h4>
            {renderExistingFields}
        </FormTypeWidgetModelFieldsStyledDiv>
    );
};
export default FormTypeWidgetModelFields;
