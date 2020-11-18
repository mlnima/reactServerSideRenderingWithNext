import React from 'react';

import {convertVariableNameToName} from '../../../../../_variables/_variables'

const RatingAndViews = props => {

    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName(props.name)}</p>
                </div>
                <div className="editor">
                    <input type='number' className='numberInput' name={props.name} value={props.value} onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null

};
export default RatingAndViews;