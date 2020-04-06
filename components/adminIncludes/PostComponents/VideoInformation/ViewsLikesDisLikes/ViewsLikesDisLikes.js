import React, { useRef, useState, useEffect } from 'react';
import { DelayInput } from 'react-delay-input'

const ViewsLikesDisLikes = props => {
    const inputElement = useRef(null)

    useEffect(() => {
        if (inputElement.current){
            inputElement.current.value = props.postData[props.name]
        }
    }, [ props.postData[props.name] ]);


    return (
        <div className='ViewsLikesDisLikes VideoInformationSection'>
            <div className="title">
                <p>{ props.name }</p>
            </div>
            <div className="editor">
                {/*<input type='number' name={ props.name } className='numberInput' value={ props.postData[props.name] } onChange={ e => props.onChangeHandler(e) }/>*/}
                <DelayInput inputRef={ inputElement } type='number' className='numberInput' name={ props.name } delayTimeout={ 1000 } onChange={ e => props.onChangeHandler(e) }/>
            </div>
        </div>
    );
};
export default ViewsLikesDisLikes;