import React from 'react';

const Duration = props => {

    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Duration</p>
                </div>
                <div className="editor">
                    <input type='text' name='duration' value={props.postData.duration}  onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null


};
export default Duration;