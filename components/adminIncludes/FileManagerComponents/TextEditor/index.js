import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from "../../../../context/AppContext";
import withRouter from 'next/dist/client/with-router'
import AdminLayout from '../../../layouts/AdminLayout'


const TextEditor = props => {
    let contextData = useContext(AppContext)
    const textArea = useRef(null)
    const message = useRef(null)
    const [ state, setState ] = useState({
        file: '',
        message: 'to leave this page please close text editor'
    });

    useEffect(() => {
        if (contextData.settings.textEditorCurrentFile !== '') {
            textArea.current.value = contextData.textEditorCurrentFile.textEditorCurrentFile
        } else {
            // props.history.push('/admin/FileManager')
        }
    }, [ , contextData.settings.textEditorCurrentFile, contextData.settings.textEditorEditMode ]);

    const onCloseHandler = () => {
        contextData.dispatchSettings({
            ...contextData.dispatchSettings,
            textEditorCurrentFile: '',
            textEditorEditMode: false
        })
        props.router.push(props.router.back())
    };

    const ReadOnlyOrEditHandler = () => {
        if (!contextData.settings.textEditorEditMode) {
            return (
                <textarea className='noEditMode' ref={ textArea } value={ contextData.settings.textEditorEditMode }/>
            )
        } else return (
            <textarea className='EditMode' ref={ textArea }/>
        )
    };

    let onEditModeHandler = () => {
        contextData.dispatchSettings({
            ...contextData.dispatchSettings,
            textEditorEditMode: true
        })
    };

    let onSaveHandler = () => {

    };

    return (
        <AdminLayout>
            <div className='TextEditor'>
                <div className='TextEditorControl'>
                    <button className='closeBtn fas fa-times' onClick={ () => onCloseHandler() }/>
                    <button className='editBtn fas fa-edit' onClick={ () => onEditModeHandler() }/>
                    <button className='editBtn fas fa-save' onClick={ () => onSaveHandler() }/>
                </div>
                <label ref={ message }>{ state.message }</label>
                {/*<button className="fas fa-arrow-left"/>*/ }
                <ReadOnlyOrEditHandler/>
            </div>
        </AdminLayout>
    );

};
export default withRouter(TextEditor);