import React, {useState, useEffect, useRef} from 'react';
import dynamic from 'next/dynamic'
import styled from "styled-components";
import {useSelector} from "react-redux";
const Editor = dynamic(() => import('@monaco-editor/react'), {ssr: false})
const TextEditor = dynamic(() => import('../../TextEditor/TextEditor'), {ssr: false})

let StyledDiv = styled.div`
  width: 98%;
  padding: 1%;
  margin: auto;
  .quill {
    width: 100%;
    height:80vh;
    margin-left: -1%;
  }
  .form-control-input {
    width: 98%;
  }
  .editor-switcher {
    margin: 10px;
    button {
      margin: 0 5px;
    }
  }
`


const TitleDescription = props => {
    const editorElement = useRef(null)
    const post = useSelector((state) => state.adminPanelPosts.post);
    const activeEditingLanguage = useSelector((state) => state.adminPanelPosts.activeEditingLanguage);
    const [editorMode, setEditorMode] = useState('monaco')

    return (
        <StyledDiv className='title-description'>
            <input type="text" name='title'
                   value={(activeEditingLanguage === 'default' ? post.title : post?.translations?.[activeEditingLanguage]?.title) || ''}
                   className='form-control-input' placeholder='Enter The Title Here'
                   onChange={e => props.onChangeHandler(e)}/>
            <div className='editor-switcher'>
                <button className={'btn btn-info'} onClick={() => setEditorMode('monaco')} >Html</button>
                <button className={'btn btn-info'}  onClick={() => setEditorMode('textEditor')} >TextEditor</button>
                <button className={'btn btn-info'}  onClick={() => setEditorMode('textarea')} >TextArea</button>
            </div>

            {
                editorMode === 'textEditor' ?
                    <TextEditor
                        state={props.state}
                        activeEditingLanguage={activeEditingLanguage}
                        onChangeHandler={props.onDescriptionChangeHandler}
                        rendering={true}
                        valueData={(activeEditingLanguage === 'default' ? post.description : post?.translations?.[activeEditingLanguage]?.description) || ''}
                    />
                    :
                    editorMode === 'monaco' ?
                        <Editor
                            ref={editorElement}
                            language='html'
                            height={props.height || '80vh'}
                            theme="vs-dark"
                            value={(activeEditingLanguage === 'default' ? post.description : post?.translations?.[activeEditingLanguage]?.description) || ''}
                            onChange={props.onDescriptionChangeHandler}
                        /> :
                        <textarea
                            onChange={props.onDescriptionChangeHandler}
                            style={{
                                width: props.width || '100%',
                                height: props.height || '80vh'
                            }}
                            value={(activeEditingLanguage === 'default' ? post.description : post?.translations?.[activeEditingLanguage]?.description) || ''}
                        />
            }


        </StyledDiv>
    );
};

export default TitleDescription;
