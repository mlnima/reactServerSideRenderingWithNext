import React, {useState, useRef} from 'react';
import dynamic from 'next/dynamic'
import styled from "styled-components";
import {useSelector} from "react-redux";

const Editor = dynamic(() => import('@monaco-editor/react'), {ssr: false})
const TextEditor = dynamic(() => import('../../TextEditor/TextEditor'), {ssr: false})
const TextEditorSunEditor = dynamic(() => import('../../TextEditors/TextEditorSunEditor/TextEditorSunEditor'), {ssr: false})

let TitleDescriptionStyledDiv = styled.div`
  width: 98%;
  padding: 1%;
  margin: auto;

  .form-control-input {
    width: 98%;
  }

  .editor-switcher {
    margin: 10px;

    button {
      margin: 0 5px;
    }
  }

  .description-editor {
    width: 100%;
    height: 80vh;
    color: var(--post-page-info-color,#ccc);
    background-color: var(--main-background-color,#000);

    .sun-editor {
      height: 95%;

      .se-container {

        .se-wrapper {
          height: 100%;

          .se-wrapper-inner{
            color: var(--post-page-info-color,#ccc);
            background-color: var(--main-background-color,#000);
          }
        }
      }
    }

    .quill {
      width: 100%;
      height: 100%;
      margin-left: -1%;
    }
  }

`


const TitleDescription = props => {
    const editorElement = useRef(null)
    const post = useSelector((state) => state.adminPanelPosts.post);
    const activeEditingLanguage = useSelector((state) => state.adminPanelPosts.activeEditingLanguage);
    const [editorMode, setEditorMode] = useState('suneditor')

    return (
        <TitleDescriptionStyledDiv className='title-description'>
            <input type="text" name='title'
                   value={(activeEditingLanguage === 'default' ? post.title : post?.translations?.[activeEditingLanguage]?.title) || ''}
                   className='form-control-input' placeholder='Enter The Title Here'
                   onChange={e => props.onChangeHandler(e)}/>
            <div className='editor-switcher'>
                <button className={'btn btn-info'} onClick={() => setEditorMode('suneditor')}>Sun Editor</button>
                <button className={'btn btn-info'} onClick={() => setEditorMode('monaco')}>Monaco Editor</button>
                <button className={'btn btn-info'} onClick={() => setEditorMode('quill')}>Quill Editor</button>
                <button className={'btn btn-info'} onClick={() => setEditorMode('textarea')}>TextArea</button>
            </div>

            <div className='description-editor'>
                {
                    editorMode === 'quill' ?
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
                            /> : editorMode === 'suneditor' ?
                                <TextEditorSunEditor name={'description'}
                                                     onSaveHandler={props.onSaveHandler}
                                                     value={(activeEditingLanguage === 'default' ? post.description : post?.translations?.[activeEditingLanguage]?.description) || ''}
                                                     onDescriptionChangeHandler={props.onDescriptionChangeHandler}
                                />
                                :
                                <textarea
                                    onChange={props.onDescriptionChangeHandler}
                                    style={{
                                        width: props.width || '100%',
                                        height: props.height || '80vh'
                                    }}
                                    value={(activeEditingLanguage === 'default' ? post.description : post?.translations?.[activeEditingLanguage]?.description) || ''}
                                />
                }
            </div>


        </TitleDescriptionStyledDiv>
    );
};

export default TitleDescription;
