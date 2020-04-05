import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import {withRouter} from "react-router";
import './TextEditor.scss'

const TextEditor = props => {
    let contextData = useContext(AppContext)
    const textArea = useRef(null)
    const message = useRef(null)
    const [state, setState] = useState({
        file: '',
        message:'to leave this page please close text editor'
    });

    useEffect(() => {
        if (contextData.filesData.file !== '') {
            textArea.current.value = contextData.filesData.file
        }else {
            // props.history.push('/admin/FileManager')
        }
    }, [, contextData.filesData.file,contextData.filesData.editFile]);

    const onCloseHandler = () => {
        let path = contextData.filesData.path;
        let splitPath = path.split('/');
        let lastItemPlusSlash = '/' + splitPath[splitPath.length - 1]
        let newPath = path.replace(lastItemPlusSlash, '');
        contextData.setFilesData({
            ...contextData.filesData,
            path: newPath,
            file: ''
        });
        props.history.push('/admin/FileManager')
    };

    const ReadOnlyOrEditHandler = () => {
        if (!contextData.filesData.editFile) {
            return (
                <textarea className='noEditMode' ref={textArea} value={contextData.filesData.file}/>
            )
        } else return (
                <textarea className='EditMode' ref={textArea}/>
        )
    };

    let onEditModeHandler = ()=>{
        contextData.filesData.editFile?
        contextData.setFilesData({
            ...contextData.filesData,
        editFile:false
        }):    contextData.setFilesData({
                ...contextData.filesData,
                editFile:true
            })

    };

    let onSaveHandler = ()=>{

    };

    return (

        <div className='TextEditor'>
            <div className='TextEditorControl'>
                <button className='closeBtn fas fa-times' onClick={() => onCloseHandler()}/>
                <button className='editBtn fas fa-edit' onClick={() => onEditModeHandler()}/>
                <button className='editBtn fas fa-save' onClick={() => onSaveHandler()}/>
            </div>
            <label ref={message}>{state.message}</label>
            {/*<button className="fas fa-arrow-left"/>*/}
            <ReadOnlyOrEditHandler/>
        </div>

    );


};
export default withRouter(TextEditor);