import React from 'react';

import {convertVariableNameToName} from '../../../../../_variables/_variables'
import {useSelector} from "react-redux";

const RatingAndViews = props => {
    const post = useSelector((state) => state.adminPanelPosts.post);
    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName(props.name)}</p>
                </div>
                <div className="editor">
                    <input type='number' className='form-control-input' name={props.name} value={post?.[props.name] || 0} onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null

};
export default RatingAndViews;