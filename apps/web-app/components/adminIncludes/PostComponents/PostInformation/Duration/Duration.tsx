import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

interface DurationPropTypes {
    onChangeHandler: any,
    rendering: boolean
}

const Duration: FC<DurationPropTypes> = ({onChangeHandler, rendering}) => {
    const duration = useSelector((store: Store) => store.adminPanelPosts.post?.duration);
    if (rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Duration</p>
                </div>
                <div className="editor">
                    <input className={'form-control-input'} type='text' name='duration' value={duration || ''}
                           onChange={e => onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null
};

export default Duration;