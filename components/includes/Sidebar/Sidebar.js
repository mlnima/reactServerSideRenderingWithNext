import React from 'react';
import WidgetsRenderer from '../WidgetsRenderer/WidgetsRenderer'

export const Sidebar = props => {

    if (props.isActive) {
        return (
            <div id='site-sidebar'>
                <WidgetsRenderer { ...props } />
            </div>
        );
    } else return null;
};

