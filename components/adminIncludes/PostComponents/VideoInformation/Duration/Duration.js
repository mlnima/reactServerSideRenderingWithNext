import React, { useEffect, useState, useContext,useRef } from 'react';
import {DelayInput} from 'react-delay-input';

const Duration = props => {

    return (
        <div className='Duration VideoInformationSection'>
            <div className="title">
                <p>Duration</p>
            </div>
            <div className="editor">
                <DelayInput name='duration' value={ props.postData.duration } delayTimeout={1000} onChange={e => props.onChangeHandler(e)}/>
            </div>
        </div>
    );
};
export default Duration;