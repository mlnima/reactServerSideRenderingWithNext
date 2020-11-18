import React, {useEffect, useState} from 'react';

import DescriptionEditor from "../DescriptionEditor/DescriptionEditor";


const TitleDescription = props => {


    const onTitleDescriptionChangeHandler = e => {
        if (props.activeEditingLanguage === 'default') {
            props.setTextInputsState({
                ...props.textInputsState,
                [e.target.name]: e.target.value
            })

        } else {
            let langObject = props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage] : {}
            props.setTextInputsState({
                ...props.textInputsState,
                translations: {
                    ...props.textInputsState.translations,
                    [props.activeEditingLanguage]: {
                        ...langObject,
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }
    const [editor, setEditor] = useState(true)






    const onDescriptionChangeHandler = data =>{
        if (props.activeEditingLanguage === 'default') {
            props.setTextInputsState({
                ...props.textInputsState,
                description: data
            })

        } else {
            let langObject = props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage] : {}
            props.setTextInputsState({
                ...props.textInputsState,
                translations: {
                    ...props.textInputsState.translations,
                    [props.activeEditingLanguage]: {
                        ...langObject,
                        description: data
                    }
                }
            })
        }
    }


     const RenderWritingArea = ()=>{

     }



    return (
        <div className='TitleDescription'>
            <input type="text" name='title'
                   value={props.activeEditingLanguage === 'default' ? props.textInputsState.title : props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage].title : ''}
                   className='TitleDescriptionTitle' placeholder='Enter The Title Here'
                   onChange={e => onTitleDescriptionChangeHandler(e)}/>

                   <div className='editor-switcher'>
                       <button onClick={()=>setEditor(false)}
                             style={{borderBottom:!editor?'none':'solid .2px gray '}}
                       >Text</button>
                       <button onClick={()=>setEditor(true)} style={{borderBottom:editor?'none':'solid .2px gray '}}>Visual</button>
                   </div>
            <DescriptionEditor {...props} onDescriptionChangeHandler={onDescriptionChangeHandler} editor={editor}/>


        </div>
    );
};

export default TitleDescription;
