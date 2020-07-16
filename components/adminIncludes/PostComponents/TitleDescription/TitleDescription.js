import React from 'react';
import { DelayInput } from 'react-delay-input';

const TitleDescription = props => {

    return (
        <div className='TitleDescription'>
            <DelayInput inputRef={props.titleElement} delayTimeout={ 4000 } name='title'  value={props.postData.title} className='TitleDescriptionTitle' placeholder='Enter The Title Here' onChange={e=>{props.onChangeHandler(e)}}/>
            <DelayInput inputRef={props.descriptionElement} element="textarea" delayTimeout={ 4000 } name='description' value={props.postData.description} className='TitleDescriptionDescription' onChange={e=>{props.onChangeHandler(e)}} />
        </div>
    );
};
export default TitleDescription;