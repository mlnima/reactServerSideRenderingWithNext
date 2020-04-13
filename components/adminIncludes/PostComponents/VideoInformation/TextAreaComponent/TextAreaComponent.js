import React, { useEffect, useState, useContext, useRef } from 'react';
import { DelayInput } from 'react-delay-input'
import { convertVariableNameToName } from '../../../../../_variables/_variables'

const TextAreaComponent = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='text-area-component VideoInformationSection'>
            <div className="title">
                <p>{convertVariableNameToName( props.name)}</p>
            </div>
            <div className="editor">
                <DelayInput element="textarea" className='textareaInput' name={ props.name } value={props.postData[props.name]} delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
                {/*<textarea value={props.postData.videoEmbedCode}  className='textareaInput' name='videoEmbedCode' onChange={e=>props.onChangeHandler(e)}/>*/}
            </div>
        </div>
    );
};
export default TextAreaComponent;
