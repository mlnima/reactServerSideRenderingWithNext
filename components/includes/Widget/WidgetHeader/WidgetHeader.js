import React from 'react';

const WidgetHeader = props => {
    return (
        <div className='WidgetHeader'>
            <p className='WidgetHeaderTitle'>{props.title}</p>
        </div>
    );
};

export default WidgetHeader;
