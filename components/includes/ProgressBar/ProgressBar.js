import React from 'react';
import './ProgressBar.scss'


const ProgressBar = props => {
    if (props.value < 1) {
        return (
            <div  className='progressParent' style={{
                backgroundColor: props.backgroundColor,
                visibility:'hidden'
            }}>
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
            }}> <p>{props.percent ? props.value + ' %' : ''}</p></div>
        </div>
    )

};
export default ProgressBar;