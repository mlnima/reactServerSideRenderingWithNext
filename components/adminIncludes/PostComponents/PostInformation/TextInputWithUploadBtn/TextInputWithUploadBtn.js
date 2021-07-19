import React, {useRef, useEffect} from 'react';
import {DelayInput} from 'react-delay-input';
import UploadFileBtn from '../UploadFileBtn/uploadFileBtn'
import {convertVariableNameToName} from '../../../../../_variables/_variables';
import styled from "styled-components";
let StyledDiv = styled.div`
  width: 100%;
  background-color: white;
  .editor{
    display: flex;
    width: 100%;
    .textInputWithUpload,textarea,input{
      border-radius: 5px;
      outline: none;
      border: none;
      padding: 3px 5px;
      height: 30px;
      background-color: #f1f1f1;
      width: 100%;
    }
    .upload-file-btn {
      button{
        width: 100%;
      }

    }
  }
`


const TextInputWithUploadBtn = props => {
    const inputElement = useRef(null)

    const onSetHandler = (key, value) => {
        const e = {
            target: {
                name: key,
                value: value
            }
        }
        props.onChangeHandler(e)
    }


    if (props.rendering) {
        return (
            <StyledDiv className='text-input-with-upload-button post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName(props.name)}</p>
                </div>
                <div className="editor">
                    <input ref={inputElement} className='textInputWithUpload' name={props.name} value={props.postData[props.name]}
                                onChange={e => props.onChangeHandler(e)}/>
                    <UploadFileBtn returnElement={inputElement} type={props.type} setFunction={onSetHandler} name={props.name}/>
                </div>
            </StyledDiv>
        )
    } else return null


};

export default TextInputWithUploadBtn;

