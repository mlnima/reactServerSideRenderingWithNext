import React, {useState, useEffect} from 'react';
import {set} from "react-ga";

const ProgressBar = props => {

    // useEffect(() => {
    //     console.log(props)
    // }, [props]);


    if (props.value < 1) {
        return (
            <div className='progressParent' style={{
                backgroundColor: props.backgroundColor
            }}>
                <div className="progressChild" style={{
                    color: props.textColor,
                    backgroundColor: props.valueColor
                }}></div>
            </div>
        );
    } else return (
        <div className='progressParent' style={{
            backgroundColor: props.backgroundColor
        }}>
            <div className="progressChild" style={{
                color: props.textColor,
                backgroundColor: props.valueColor,
                width: props.value + '%'
            }}> {props.percent ? props.value + ' %' : ''}</div>
        </div>
    )

};
export default ProgressBar;