import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../../../../../context/AppContext";

const TextInput = props => {
    const contextData = useContext(AppContext);
    return (
        <div className='TextInput VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                <input className='TextInput' name={ props.name } onBlur={ e => {
                    props.onChangeHandler(e)
                    e.target.value = contextData.editingPostData[e.target.name]
                } }/>
            </div>
        </div>
    );
};
export default TextInput;