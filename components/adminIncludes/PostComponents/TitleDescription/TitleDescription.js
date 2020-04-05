import React from 'react';

const TitleDescription = props => {

    return (
        <div className='TitleDescription'>
            <input name='title'  value={props.postData.title} className='TitleDescriptionTitle' placeholder='Enter The Title Here' onChange={e=>{props.onChangeHandler(e)}}/>
            <textarea name='description' value={props.postData.description} className='TitleDescriptionDescription' onChange={e=>{props.onChangeHandler(e)}} />
        </div>
    );
};
export default TitleDescription;