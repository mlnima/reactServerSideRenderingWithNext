import React from 'react';
import { DelayInput } from 'react-delay-input'

const ViewsLikesDisLikes = props => {

    return (
        <div className='ViewsLikesDisLikes VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                {/*<input  type='number' name={ props.name } className='numberInput' value={props.postData[props.name]}   onChange={ e => props.onChangeHandler(e) }/>*/}
                <DelayInput type='number' className='numberInput' name={ props.name } value={props.postData[props.name]} delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
            </div>
        </div>
    );
};
export default ViewsLikesDisLikes;