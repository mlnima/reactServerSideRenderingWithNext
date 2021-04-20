import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from "../../../../context/AppContext";
import withRouter from 'next/dist/client/with-router'
import AdminLayout from '../../../layouts/AdminLayout'
import styled from "styled-components";
let StyledDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;


  .TextEditorControl{

    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    justify-content: space-evenly;
    align-items: center;
    button{

     // @include darkBtn;
      font-size:large;
      padding: 3px 5px;
    }
  }

  textarea {
    margin-top: 20px;
    width: 90%;
    height: 90%;
  }
  label{
    margin-top: 20px;
    padding: 5px;
  // @include contentBorder;
  }
  .noEditMode{
    background-color:gray;
  }
  .EditMode{
    background-color:white;
     }
`

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
            <StyledDiv className='TextEditor'>
                <div className='TextEditorControl'>
                    <button className='closeBtn fas fa-times' onClick={ () => onCloseHandler() }/>
                    <button className='editBtn fas fa-edit' onClick={ () => onEditModeHandler() }/>
                    <button className='editBtn fas fa-save' onClick={ () => onSaveHandler() }/>
                </div>
                <label ref={ message }>{ state.message }</label>
                {/*<button className="fas fa-arrow-left"/>*/ }
                <ReadOnlyOrEditHandler/>
            </StyledDiv>
        </AdminLayout>
    );

};
export default withRouter(TextEditor);