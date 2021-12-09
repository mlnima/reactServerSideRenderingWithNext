import React, {useEffect, useState, useContext, useRef} from 'react';
import dynamic from "next/dynamic";
import styled from "styled-components";
const TextEditorMonacoEditor = dynamic(() => import('./TextEditorMonacoEditor/TextEditorMonacoEditor'))
const TextEditorSunEditor = dynamic(() => import('./TextEditorSunEditor/TextEditorSunEditor'), {ssr: false})
const TextEditorReactQuill = dynamic(() => import('./TextEditorReactQuill/TextEditorReactQuill'), {ssr: false})
const TextEditorReactPage = dynamic(() => import('./TextEditorReactPage/TextEditorReactPage'), {ssr: false})

const TextEditorsStyledDiv = styled.div`
  .text-editors-switcher {
    .custom-select {
      width: 200px;
    }
  }
`

interface TextEditorsPropTypes {
    name?: string;
    value: string;
    language: string;
    openWith: string;
    height?: string;
    width?: string;
    onChangeHandler: any;
    use?: string[];
}

const TextEditors = ({value, onChangeHandler, language, height, width, name, use, openWith}: TextEditorsPropTypes) => {

    const [editor, setEditor] = useState<string | null>(null);

    useEffect(() => {
        setEditor(openWith)
    }, [openWith]);


    const onChangeEditorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditor(e.target.value)
    }


    return (
        <TextEditorsStyledDiv className={'text-editors'}>
            <div className={'text-editors-header'}>
            </div>
            <div className={'text-editors-switcher'}>
                <select className={'custom-select'} onChange={e => onChangeEditorHandler(e)} value={editor ?? ''}>
                    <option value={''}>Select</option>
                    {use?.map((editor:string,index:number)=>{
                        return(
                            <option key={index} value={editor}>{editor}</option>
                        )
                    })}
                    {/*{use?.includes('Monaco') || !use ? <option value={'Monaco'}>Monaco Editor</option> : null}*/}
                    {/*{use?.includes('SunEditor') || !use ? <option value={'SunEditor'}>Sun Editor</option> : null}*/}
                    {/*{use?.includes('ReactQuillEditor') || !use ? <option value={'ReactQuillEditor'}>React Quill Editor</option> : null}*/}
                    {/*{use?.includes('ReactPage') || !use ? <option value={'ReactPage'}>React Page</option> : null}*/}
                    {/*{use?.includes('TextArea') || !use ? <option value={'TextArea'}>Text Area</option> : null}*/}
                </select>
            </div>
            <div className={'text-editors-content'}>
                {editor === 'Monaco' && use?.includes('Monaco') || !use ?
                    <TextEditorMonacoEditor value={value}
                                            onChangeHandler={onChangeHandler}
                                            language={language}
                                            width={width}
                                            height={height}
                                            name={name}
                    />
                    : null
                }
                {editor === 'SunEditor' && use?.includes('SunEditor') || !use ?
                    <TextEditorSunEditor value={value}
                                         onChangeHandler={onChangeHandler}
                                         language={language}
                                         width={width}
                                         height={height}
                    />
                    : null
                }
                {editor === 'ReactQuillEditor' && use?.includes('ReactQuillEditor') || !use ?
                    <TextEditorReactQuill value={value }
                                          onChangeHandler={onChangeHandler}
                                          language={language}
                                          width={width}
                                          height={height}
                    />
                    : null
                }
                {editor === 'ReactPage' && use?.includes('ReactPage') || !use ?
                    <TextEditorReactPage value={value || {}}
                                         onChangeHandler={onChangeHandler}
                                         language={language}
                                         width={width}
                                         height={height}
                    />
                    : null
                }

                {editor === 'TextArea' && use?.includes('TextArea') || !use ?
                    <textarea value={value}
                              onChange={e => onChangeHandler(e)}
                              name={name}
                              style={{
                                  width: width || '100%',
                                  height: height || '50vh'
                              }}
                    />
                    : null
                }

            </div>
        </TextEditorsStyledDiv>
    );
};
export default TextEditors;
