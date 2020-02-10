import React, { useEffect, useState, useContext,useRef } from 'react';
import { AppContext } from "../../../../../context/AppContext";

const Duration = props => {
    const contextData = useContext(AppContext);
    const hour = useRef(null)
    const minute = useRef(null)
    const second = useRef(null)

    const onCalculateAndSetHandler = ()=>{
        // let value = (hour.current.value *3600) + (minute.current.value *60) + second.current.value;
        props.onDurationChangeHandler((hour.current.value *3600) + (minute.current.value *60) + second.current.value)
    };


    return (
        <div className='Duration VideoInformationSection'>
            <div className="title">
                <p>Duration</p>
            </div>
            <div className="editor">
                <div className="durationItems">
                    <div className="durationItem">
                        <input ref={hour} name='durationH' type="number"
                               min="0" max="10"  onChange={()=>onCalculateAndSetHandler()}/>
                        <label>H</label>
                    </div>
                    <div className="durationItem">
                        <input  ref={minute} name='durationM' type="number"
                               min="0" max="60"  onChange={()=>onCalculateAndSetHandler()}/>
                        <label>M</label>
                    </div>
                    <div className="durationItem">
                        <input  ref={second} name='durationS' type="number"
                               min="0" max="60"  onChange={()=>onCalculateAndSetHandler()}/>
                        <label>S</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Duration;