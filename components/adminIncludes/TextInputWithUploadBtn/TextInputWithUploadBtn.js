import React, { useRef } from 'react';
import UploadFileBtn from '../UploadFileBtn/uploadFileBtn'
import convertVariableNameToName from "../../../_variables/util/convertVariableNameToName";

import {fileUpload,postThumbnailsUpload} from "../../../_variables/_ajaxFilesVariables";

const TextInputWithUploadBtn = props => {
    const inputElement = useRef(null)
    const uploadInputElement = useRef(null)

    const onSetHandler = (key, value) => {
        const e = {
            target: {
                name: key,
                value: value
            }
        }
        props.onChangeHandler(e)
    }

        return (
        <div className='TextInputWithUploadBtn VideoInformationSection'>
            <div className="title">
                <p>{ convertVariableNameToName(props.name) }</p>
            </div>
            <div className="editor">
                <input inputRef={ inputElement } className={'form-control-input'} name={ props.name } value={ props.postData[props.name] }  onChange={ e => props.onChangeHandler(e) }/>
                <UploadFileBtn returnElement={inputElement}  type={props.type} setFunction={ onSetHandler } name={ props.name }/>
            </div>
        </div>
    )

};

export default TextInputWithUploadBtn;

