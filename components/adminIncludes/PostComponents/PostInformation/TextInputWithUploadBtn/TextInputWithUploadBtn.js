import React, {useRef, useEffect} from 'react';

import UploadFileBtn from '../UploadFileBtn/uploadFileBtn'
import {convertVariableNameToName} from '../../../../../_variables/_variables';
import styled from "styled-components";
import {useSelector} from "react-redux";
let StyledDiv = styled.div`
  width: 100%;
  background-color: white;
  .editor{
    display: flex;
    width: 100%;
    .textInputWithUpload,textarea,input{
      outline: none;
      padding: 3px 5px;
      height: 30px;
      width: 80%;
    }
    //.upload-file-btn {
    //  button{
    //    width: 100%;
    //  }
    //
    //}
  }
`


const TextInputWithUploadBtn = props => {
    const inputElement = useRef(null)
    const post = useSelector((state) => state.adminPanelPosts.post);

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
                    <input ref={inputElement} className={'form-control-input'} type={'text'} name={props.name} value={post[props.name] || ''}
                                onChange={e => props.onChangeHandler(e)}/>
                    <UploadFileBtn returnElement={inputElement} type={props.type} setFunction={onSetHandler} name={props.name}/>
                </div>
            </StyledDiv>
        )
    } else return null


};

export default TextInputWithUploadBtn;

