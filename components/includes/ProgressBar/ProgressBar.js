import React from 'react';

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
            <span className="progressChild" style={{
                color: props.textColor,
                backgroundColor: props.valueColor,
                width: props.value + '%'
            }}> <p>{props.percent ? props.value + ' %' : ''}</p></span>
        </div>
    )

};
export default ProgressBar;