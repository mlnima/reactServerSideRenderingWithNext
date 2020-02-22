import React from 'react';

const ProgressBar = props => {

    let valueStyle = {
        width:props.value + '%'
    };

    if(props.value<1){
        return (
            <div className='progressParent'>
                <div className="progressChild" style={valueStyle}> </div>
            </div>
        );
    }else return (
        <div className='progressParent'>
            <div className="progressChild" style={valueStyle}>{props.value} %</div>
        </div>
    )

};
export default ProgressBar;