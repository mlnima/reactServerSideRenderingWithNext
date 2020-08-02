import React, {useState,useEffect} from 'react';
import {set} from "react-ga";

const ProgressBar = props => {




    if (props.value < 1) {
        return (
            <div className='progressParent' style={{
                backgroundColor:props.progressBarBackgroundColor || '#333'
            }}>
                <div className="progressChild" style={{
                    color:props.valueColor || 'white',
                    backgroundColor:props.progressBarColor || 'red'
                }}></div>
            </div>
        );
    } else return (
        <div className='progressParent' style={{
            backgroundColor:props.progressBarBackgroundColor
        }} >
            <div className="progressChild" style={{
                color:props.valueColor,
                backgroundColor:props.progressBarColor,
                width: props.value + '%'
            }}> { props.percent ? props.value + ' %' : ''}</div>
        </div>
    )

};
export default ProgressBar;