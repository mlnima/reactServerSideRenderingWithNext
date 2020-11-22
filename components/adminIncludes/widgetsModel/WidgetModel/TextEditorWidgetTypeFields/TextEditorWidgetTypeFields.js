import React, {useEffect, useState, useContext, useRef} from 'react';
import TextEditor from "../../../TextEditor/TextEditor";

const TextEditorWidgetTypeFields = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div>
                <TextEditor state={props.textInputsState} activeEditingLanguage={props.activeEditingLanguage} onChangeHandler={onDescriptionChangeHandler}/>
        </div>
    );
};
export default TextEditorWidgetTypeFields;
