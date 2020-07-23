import React from 'react';
import {DelayInput} from 'react-delay-input';

const TitleDescription = props => {

    return (
        <div className='TitleDescription'>
            <input ref={props.titleElement} name='title' value={
                props.activeEditingLanguage === 'default' ? props.textInputsState.title :
                    props.textInputsState.translations?
                    props.textInputsState.translations[props.activeEditingLanguage] ?
                    props.textInputsState.translations[props.activeEditingLanguage].title || '' : '': ''

            } className='TitleDescriptionTitle' placeholder='Enter The Title Here'
                   onChange={e => props.onChangeHandler(e)}/>
            <textarea ref={props.descriptionElement} name='description' value={
                props.activeEditingLanguage === 'default' ? props.textInputsState.description :
                    props.textInputsState.translations?
                    props.textInputsState.translations[props.activeEditingLanguage] ?
                        props.textInputsState.translations[props.activeEditingLanguage].description || '' : '': ''

            } className='TitleDescriptionDescription' onChange={e => props.onChangeHandler(e)}/>
        </div>
    );
};

export default TitleDescription;
