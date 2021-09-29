import React from 'react';
import WidgetsRenderer from '../WidgetsRenderer/WidgetsRenderer'
const Sidebar = props => {
    if (props.isActive) {
        return (
            <div className='site-sidebar'  key={props.position} >
                <WidgetsRenderer {...props} />
            </div>
        );
    } else return null;
};


export default Sidebar;