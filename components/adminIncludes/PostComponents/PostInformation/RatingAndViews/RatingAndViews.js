import React, { useRef, useState, useEffect } from 'react';
import { DelayInput } from 'react-delay-input'
import { convertVariableNameToName } from '../../../../../_variables/_variables'

const RatingAndViews = props => {
    const inputElement = useRef(null)

    useEffect(() => {
        if (inputElement.current){
            inputElement.current.value = props.postData[props.name]
        }
    }, [ props.postData[props.name] ]);
    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName( props.name) }</p>
                </div>
                <div className="editor">
                    <DelayInput inputRef={ inputElement } type='number' className='numberInput' name={ props.name } delayTimeout={ 1000 } onChange={ e => props.onChangeHandler(e) }/>
                </div>
            </div>
        );
    }else return null


};
export default RatingAndViews;