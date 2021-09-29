import React, {useState} from 'react';
import loadable from '@loadable/component';
import NoSSR from 'react-no-ssr';
import styled from "styled-components";
import Editor from "@monaco-editor/react";
const TextEditor = loadable(() => import('../../TextEditor/TextEditor'))

let StyledDiv = styled.div`
  width: 98%;
  padding: 1%;
  margin: auto;

  .quill {
    width: 100%;
    margin-left: -1%;
  }

  .TitleDescriptionTitle {
    border-radius: 5px;
    outline: none;
    height: 30px;
    width: 98%;
    padding: 0 1%;
    background-color: white;
    border: .1px solid rgba(0, 0, 0, .2);
  }

  .TitleDescriptionDescription {
    margin-top: 10px;
    min-height: 600px;
    //border-radius: 5px;
    outline: none;
    //border: none;
    padding: 3px 5px;
    height: 30px;
    width: 95%;
    background-color: white;
  }

  .editor-switcher {
    margin: 10px;
    
    button {
      outline: none;
      margin: 0 5px;
      padding: 5px 10px;

    }
  }
`


const TitleDescription = props => {
    //ReactQuill
    const [editorMode, setEditorMode] = useState('monaco')

    const onChangeModeHandler = (e) => {
        setEditorMode(e.target.name)
    }


    return (
        <StyledDiv className='title-description'>
            <input type="text" name='title'
                   value={(props.activeEditingLanguage === 'default' ? props.textInputsState.title : props.textInputsState?.translations?.[props.activeEditingLanguage]?.title) || ''}
                   className='TitleDescriptionTitle' placeholder='Enter The Title Here'
                   onChange={e => props.onChangeHandler(e)}/>
            <div className='editor-switcher'>
                <button onClick={e=>onChangeModeHandler(e)} name='monaco'>Html</button>
                <button onClick={e=>onChangeModeHandler(e)} name='textEditor'>TextEditor</button>
                <button onClick={e=>onChangeModeHandler(e)} name='textarea'>TextArea</button>
            </div>

            {
                editorMode === 'textEditor'?
                    <NoSSR>
                        <TextEditor
                            state={props.textInputsState}
                            activeEditingLanguage={props.activeEditingLanguage}
                            onChangeHandler={props.onDescriptionChangeHandler}
                            rendering={true}
                            valueData={(props.activeEditingLanguage === 'default' ? props.textInputsState.description : props?.textInputsState.translations?.[props.activeEditingLanguage]?.description).toString() || ''}
                        />
                    </NoSSR>:
                    editorMode === 'monaco' ?
                        <Editor
                            language='html'
                            width={props.width || '100%'}
                            height={props.height || '80vh'}
                            theme="vs"
                            defaultValue={(props.activeEditingLanguage === 'default' ? props.textInputsState.description : props?.textInputsState.translations?.[props.activeEditingLanguage]?.description) || ''}
                            value={(props.activeEditingLanguage === 'default' ? props.textInputsState.description : props?.textInputsState.translations?.[props.activeEditingLanguage]?.description) || ''}
                            onChange={props.onDescriptionChangeHandler}
                            //className='style-section-editor'
                        />  :
                        <textarea
                            onChange={props.onDescriptionChangeHandler}
                            style={{
                                width:props.width || '100%',
                                height:props.height || '80vh'
                            }}

                            value={(props.activeEditingLanguage === 'default' ? props.textInputsState.description : props?.textInputsState.translations?.[props.activeEditingLanguage]?.description) || ''}
                        />
            }



        </StyledDiv>
    );
};

export default TitleDescription;
