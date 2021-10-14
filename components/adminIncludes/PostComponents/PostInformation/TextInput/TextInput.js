import React from 'react';
import {convertVariableNameToName} from '../../../../../_variables/_variables'
import styled from "styled-components";
let StyledTextarea = styled.textarea`
        outline: none;
        padding: 3px 5px;
        height: 30px;
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