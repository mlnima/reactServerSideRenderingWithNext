import React from 'react';
import {DelayInput} from 'react-delay-input';

const Duration = props => {

    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Duration</p>
                </div>
                <div className="editor">
                    <DelayInput name='duration' value={props.postData.duration} delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null


};
export default Duration;