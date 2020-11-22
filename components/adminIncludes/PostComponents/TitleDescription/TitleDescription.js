import React,{useEffect} from 'react';
import loadable from '@loadable/component';
//import dynamic from 'next/dynamic'
//const TextEditor = dynamic(() => import('../../TextEditor/TextEditor'))
import NoSSR from 'react-no-ssr';

const TextEditor = loadable(() => import('../../TextEditor/TextEditor'))
import './TitleDescription.scss'


const TitleDescription = props => {


    return (
        <div className='title-description'>
            <input type="text" name='title'
                // value={props.activeEditingLanguage === 'default' ? props.textInputsState.title : props.textInputsState.translations[props.activeEditingLanguage] ? props.textInputsState.translations[props.activeEditingLanguage].title : ''}
                   value={(props.activeEditingLanguage === 'default' ? props.textInputsState.title : props.textInputsState?.translations?.[props.activeEditingLanguage]?.title) || ''}
                   className='TitleDescriptionTitle' placeholder='Enter The Title Here'
                   onChange={e => props.onChangeHandler(e)}/>
            <NoSSR>
                <TextEditor
                    state={props.textInputsState}
                    activeEditingLanguage={props.activeEditingLanguage}
                    onChangeHandler={props.onDescriptionChangeHandler}
                    rendering={true}
                    // value={
                    //     props.activeEditingLanguage === 'default' ?
                    //         props.textInputsState.description :
                    //         props.textInputsState.translations[props.activeEditingLanguage] ?
                    //             props.textInputsState.translations[props.activeEditingLanguage].description : ''
                    // }
                    valueData={ (props.activeEditingLanguage === 'default' ? props.textInputsState.description : props?.textInputsState.translations?.[props.activeEditingLanguage]?.description) || ''}
                />
            </NoSSR>
        </div>
    );
};

export default TitleDescription;
