import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import TextEditorMonacoEditor from './TextEditorMonacoEditor/TextEditorMonacoEditor'
import TextEditorSunEditor from './TextEditorSunEditor/TextEditorSunEditor'
import { cookieSetter } from '@lib/actions/cookieTools';

const TextEditorsStyledDiv = styled.div`
  .text-editors-switcher {
    .primarySelect {
      width: 200px;
    }
  }
  
  .text-editors-content{
   
    .sun-editor{
    
      .sun-editor-common{
  
        background-color: var(--secondary-background-color,#000);
        .se-btn-tray{
          *{
            color: var(--primary-text-color,#fff);
            background-color: var(--primary-background-color,#000);
          }
        }
      }
    }
  }
`





interface TextEditorsPropTypes {
    name?: string;
    value?: string|object|undefined;
    language: string;
    openWith: string;
    height?: string;
    width?: string;
    onChangeHandler: any;
    use?: string[];
}

const TextEditors = ({value, onChangeHandler, language, height, width, name, use, openWith}: TextEditorsPropTypes) => {

    const [editor, setEditor] = useState<string >('Monaco');

    useEffect(() => {
        setEditor(openWith)
    }, [openWith]);


    const onChangeEditorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        cookieSetter({
          name: 'adminPostEditor',
          value: e.target.value,
        });
        setEditor(e.target.value)
    }


    return (
        <TextEditorsStyledDiv className={'text-editors'} >
            <div className={'text-editors-header'}>
            </div>
            <div className={'text-editors-switcher'}>
                <select className={'primarySelect'} defaultValue={'Monaco'} onChange={e => onChangeEditorHandler(e)} value={editor ?? ''}>
                    <option value={''}>Select</option>
                    {use?.map((editor:string,index:number)=>{
                        return(
                            <option key={index} value={editor}>{editor}</option>
                        )
                    })}
                </select>
            </div>
            <div className={'text-editors-content'}>
                {editor === 'Monaco' && use?.includes('Monaco') || !use ?
                    <TextEditorMonacoEditor value={value as string|object}
                                            onChangeHandler={onChangeHandler}
                                            language={language}
                                            width={width}
                                            height={height}
                                            name={name}
                    />
                    : null
                }
                {editor === 'SunEditor' && use?.includes('SunEditor') || !use ?
                    <TextEditorSunEditor value={value as string}
                                         onChangeHandler={onChangeHandler}
                                         language={language}
                                         width={width}
                                         height={height}
                    />
                    : null
                }
                {editor === 'TextArea' && use?.includes('TextArea') || !use ?
                    <textarea value={value as string}
                              onChange={(e) => onChangeHandler(e)}
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
