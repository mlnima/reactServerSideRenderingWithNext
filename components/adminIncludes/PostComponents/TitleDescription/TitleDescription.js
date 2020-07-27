import React, {useEffect, useState} from 'react';
import {DelayInput} from 'react-delay-input';

const TitleDescription = props => {

    // const [state, setState] = useState({
    //     title: '',
    //     description: ''
    // })
    //
    // useEffect(() => {
    //     if (props.activeEditingLanguage === 'default') {
    //         setState({
    //             ...state,
    //             title: props.textInputsState.title,
    //             description: props.textInputsState.description
    //         })
    //     } else {
    //         if (props.textInputsState.translations[props.activeEditingLanguage]) {
    //             setState({
    //                 ...state,
    //                 title: props.textInputsState.translations[props.activeEditingLanguage].title || '',
    //                 description: props.textInputsState.translations[props.activeEditingLanguage].description || ''
    //             })
    //         }
    //     }
    //
    //
    // }, [props]);

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




    return (
        <div className='TitleDescription'>
            <input type="text"  name='title' value={ props.activeEditingLanguage === 'default' ? props.textInputsState.title :  props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage].title : ''          }
                   className='TitleDescriptionTitle' placeholder='Enter The Title Here'
                   onChange={e => onTitleDescriptionChangeHandler(e)}/>
            <textarea  name='description' value={props.activeEditingLanguage === 'default' ? props.textInputsState.description :  props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage].description : ''  }
                      className='TitleDescriptionDescription' onChange={e => onTitleDescriptionChangeHandler(e)}/>
        </div>
    );
};

export default TitleDescription;
