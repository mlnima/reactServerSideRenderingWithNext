import React from 'react';

const ViewsLikesDisLikes = props => {

    return (
        <div className='ViewsLikesDisLikes VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                <input  type='number' name={ props.name } className='numberInput' value={props.postData[props.name]}   onChange={ e => props.onChangeHandler(e) }/>
            </div>
        </div>
    );
};
export default ViewsLikesDisLikes;