import React, {useEffect, useState, useContext, useRef} from 'react';
import WidgetsRenderer from "../WidgetsRenderer/WidgetsRenderer";
import {AppContext} from "../../../context/AppContext";

const DynamicTopBar = props => {
    const contextData = useContext(AppContext);

    return (
        <div className='dynamic-top-bar' style={{
            backgroundColor:contextData.siteDesign.topBarBackgroundColor || '#181818',
            height:'40px',
            display:'flex',
            justifyContent :'flex-start',
            alignItems:'center',
            padding:'0 20px'
        }}>
            <WidgetsRenderer widgets={ contextData.siteWidgets } position='dynamicTopBar'/>
        </div>
    );
};
export default DynamicTopBar;
