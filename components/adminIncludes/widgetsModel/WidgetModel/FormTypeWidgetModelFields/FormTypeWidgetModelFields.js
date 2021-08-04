import { useState} from 'react';
import AddFormConditional from "./AddFormConditional";
import FieldPreview from "./FieldPreview";

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
                <p>Form Name :</p>
                <input name='formName' type='text' value={props.widgetData.formData.formName}
                            onChange={e => onChangeHandler(e)}/>
                <p>Form Title :</p>
                <input name='formTitle' type='text' value={props.widgetData.formData.formTitle}
                             onChange={e => onChangeHandler(e)}/>
                <p>After Submit Message :</p>
                <input type='text' name='afterSubmitMessage' value={props.widgetData.formData.afterSubmitMessage}  onChange={e => onChangeHandler(e)}/>
                <p>Submit button text :</p>
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
