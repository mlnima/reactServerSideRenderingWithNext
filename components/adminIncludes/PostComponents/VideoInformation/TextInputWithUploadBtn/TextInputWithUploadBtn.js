import React, { useEffect, useState, useContext,useRef } from 'react';
import { AppContext } from "../../../../../context/AppContext";

const TextInputWithUploadBtn = props => {
    const contextData = useContext(AppContext);
    const element = useRef(null);

    useEffect(()=>{
        if (element.current){
            if (contextData.editingPostData[element.current.name]){
                element.current.value = contextData.editingPostData[element.current.name]
            }
        }
    },[ contextData.editingPostData]);


    return (
        <div className='TextInputWithUploadBtn VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                <input ref={element} className='textInputWithUpload' name={ props.name } onChange={e=>props.onChangeHandler(e)} />
                <button className='uploadBtn'>Upload</button>
            </div>
        </div>
    );
};
export default TextInputWithUploadBtn;

//     onChange={e=>{contextData.functions.setEditingPostData(e.target.name,e.target.value)}}