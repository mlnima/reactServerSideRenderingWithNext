import React from 'react';
import { DelayInput } from 'react-delay-input'
import {convertVariableNameToName} from '../../../../../_variables/_variables'

const TextInput = props => {
    return (
        <div className='TextInput VideoInformationSection'>
            <div className="title">
                <p>{convertVariableNameToName( props.name) }</p>
            </div>
            <div className="editor">
                {/*<input className='TextInput' name={ props.name } value={ props.postData[props.name] } onBlur={ e => props.onChangeHandler(e) }/>*/}
                <DelayInput className='TextInput' name={ props.name } value={ props.postData[props.name] } delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
            </div>
        </div>
    );
};
export default TextInput;