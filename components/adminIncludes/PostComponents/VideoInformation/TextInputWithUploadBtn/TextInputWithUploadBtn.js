import React from 'react';

const TextInputWithUploadBtn = props => {

    return (
        <div className='TextInputWithUploadBtn VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                <input  className='textInputWithUpload' value={props.postData[props.name]} name={ props.name } onChange={e=>props.onChangeHandler(e)} />
                <button className='uploadBtn'>Upload</button>
            </div>
        </div>
    )

};

export default TextInputWithUploadBtn;

