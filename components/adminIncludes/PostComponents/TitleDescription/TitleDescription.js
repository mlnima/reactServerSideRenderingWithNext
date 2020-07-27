import React, {useEffect, useState} from 'react';
import {DelayInput} from 'react-delay-input';
import {set} from "react-ga";

const TitleDescription = props => {

    const [state, setState] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {

        if (props.activeEditingLanguage === 'default') {
            setState({
                ...state,
                title: props.textInputsState.title,
                description: props.textInputsState.description
            })
        } else {
            if (props.textInputsState.translations[props.activeEditingLanguage]) {
                setState({
                    ...state,
                    title: props.textInputsState.translations[props.activeEditingLanguage].title || '',
                    description: props.textInputsState.translations[props.activeEditingLanguage].description || ''
                })
            }
        }


    }, [props]);
    return (
        <div className='TitleDescription'>
            <input type="text" ref={props.titleElement} name='title' value={state.title}
                   className='TitleDescriptionTitle' placeholder='Enter The Title Here'
                   onChange={e => props.onChangeHandler(e)}/>
            <textarea type="text" ref={props.descriptionElement} name='description' value={state.description}
                      className='TitleDescriptionDescription' onChange={e => props.onChangeHandler(e)}/>
        </div>
    );
};

export default TitleDescription;
