import React, { useEffect, useState, useContext, useRef } from 'react';
import WidgetsRenderer from '../WidgetsRenderer/WidgetsRenderer'

const Sidebar = props => {

    if (props.isActive){
    return (
        <aside id='site-sidebar'>
            <WidgetsRenderer {...props} />
        </aside>
    );
    }else return null;
};
export default Sidebar;
