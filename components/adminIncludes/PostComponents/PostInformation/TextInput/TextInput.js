import React from 'react';
import { DelayInput } from 'react-delay-input'
import {convertVariableNameToName} from '../../../../../_variables/_variables'

const TextInput = props => {

    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName( props.name) }</p>
                </div>
                <div className="editor">
                    <DelayInput className='TextInput' name={ props.name } value={ props.postData[props.name] } delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    }else return null

};
export default TextInput;