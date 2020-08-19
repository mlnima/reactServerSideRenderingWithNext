import React, {useEffect, useState, useContext, useRef} from 'react';
import WidgetsRenderer from "../WidgetsRenderer/WidgetsRenderer";
import {AppContext} from "../../../context/AppContext";

const DynamicNavigation = props => {
    const contextData = useContext(AppContext);

    return (
        <div className='dynamic-navigation'>
            <WidgetsRenderer widgets={ contextData.siteWidgets } position='dynamicNavigation'/>
        </div>
    );
};
export default DynamicNavigation;
