import React from 'react';

const ProgressBar = props => {

    let valueStyle = {
        width: props.value + '%'
    };

    const textValue = props.percent ? props.value + ' %' : '';

    if (props.value < 1) {
        return (
            <div className='progressParent'>
                <div className="progressChild" style={ valueStyle }></div>
            </div>
        );
    } else return (
        <div className='progressParent'>
            <div className="progressChild" style={ valueStyle }> { textValue }</div>
        </div>
    )

};
export default ProgressBar;