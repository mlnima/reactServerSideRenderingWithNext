import React from 'react';
import { DelayInput } from 'react-delay-input'

const TextInputWithUploadBtn = props => {

    return (
        <div className='TextInputWithUploadBtn VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                <DelayInput  className='textInputWithUpload' name={ props.name } value={props.postData[props.name]} delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
                {/*<input  className='textInputWithUpload' value={props.postData[props.name]} name={ props.name } onChange={e=>props.onChangeHandler(e)} />*/}
                <button className='uploadBtn'>Upload</button>
            </div>
        </div>
    )

};

export default TextInputWithUploadBtn;

