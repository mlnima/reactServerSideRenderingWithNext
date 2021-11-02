import React from 'react';
import {useSelector} from "react-redux";

const Duration = props => {
    const duration = useSelector((store) => store.adminPanelPosts.post?.duration);
    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Duration</p>
                </div>
                <div className="editor">
                    <input className={'form-control-input'} type='text' name='duration' value={duration || ''}  onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null
};
export default Duration;