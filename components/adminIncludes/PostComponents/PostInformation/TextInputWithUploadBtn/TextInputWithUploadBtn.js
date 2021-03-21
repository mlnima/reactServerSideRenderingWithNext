import React, {useRef, useEffect} from 'react';
import {DelayInput} from 'react-delay-input';
import UploadFileBtn from '../UploadFileBtn/uploadFileBtn'
import {convertVariableNameToName} from '../../../../../_variables/_variables';



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
            <div className='text-input-with-upload-button post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName(props.name)}</p>
                </div>
                <div className="editor">
                    <DelayInput inputRef={inputElement} className='textInputWithUpload' name={props.name} value={props.postData[props.name]} delayTimeout={1000}
                                onChange={e => props.onChangeHandler(e)}/>
                    <UploadFileBtn returnElement={inputElement} type={props.type} setFunction={onSetHandler} name={props.name}/>
                </div>
            </div>
        )
    } else return null


};

export default TextInputWithUploadBtn;

