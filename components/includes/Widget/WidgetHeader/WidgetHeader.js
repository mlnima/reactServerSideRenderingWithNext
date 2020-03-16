import React from 'react';

const WidgetHeader = props => {

    if (props.title){
        return (
            <div className='WidgetHeader'>
                <p className='WidgetHeaderTitle'>{props.title}</p>
            </div>
        );
    }else return null

};

export default WidgetHeader;
