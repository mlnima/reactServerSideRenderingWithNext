import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../../context/AppContext'
import WidgetsRenderer from '../WidgetsRenderer/WidgetsRenderer'

const Header = () => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        style: {},
    });

    useEffect(() => {
        const justifyContentPropertyOfHeader = contextData.siteWidgets.filter(i=>i.data.position === 'header').length >1 ? 'space-between' : 'center'
        setState({
            ...state,
            style: {
                ...state.style,
                backgroundColor: contextData.siteDesign.headerBackgroundColor,
                color: contextData.siteDesign.headerTextColor,
                justifyContent: justifyContentPropertyOfHeader
            }
        })
    }, [contextData.siteDesign,contextData.siteWidgets]);

    return (
        <div className='header' style={state.style}>
            <WidgetsRenderer widgets={contextData.siteWidgets} position='header'/>
        </div>
    );
};
export default Header;


