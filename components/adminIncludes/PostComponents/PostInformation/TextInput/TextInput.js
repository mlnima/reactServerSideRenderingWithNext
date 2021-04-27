import React from 'react';
import { DelayInput } from 'react-delay-input'
import {convertVariableNameToName} from '../../../../../_variables/_variables'
import styled from "styled-components";
let StyledTextarea = styled.textarea`
        border-radius: 5px;
        outline: none;
        border: none;
        padding: 3px 5px;
        height: 30px;
        background-color: #f1f1f1;
        width: 90%;
`
const TextInput = props => {

    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName( props.name) }</p>
                </div>
                <div className="editor">
                    <StyledTextarea className='TextInput' name={ props.name } value={ props.postData[props.name] }  onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    }else return null

};
export default TextInput;