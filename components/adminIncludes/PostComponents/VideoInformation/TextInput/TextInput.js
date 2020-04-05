import React from 'react';

const TextInput = props => {
    return (
        <div className='TextInput VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                <input className='TextInput' name={ props.name } value={ props.postData[props.name] } onBlur={ e => props.onChangeHandler(e) }/>
            </div>
        </div>
    );
};
export default TextInput;