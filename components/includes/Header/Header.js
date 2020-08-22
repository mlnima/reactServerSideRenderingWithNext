import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../context/AppContext'
import WidgetsRenderer from '../WidgetsRenderer/WidgetsRenderer'

const Header = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style:{}
    });

    useEffect(() => {
        setState({
            ...state,
            style:{
                backgroundColor:contextData.siteDesign.headerBackgroundColor,
                color:contextData.siteDesign.headerTextColor
            }
        })
    }, [contextData.siteDesign]);

    return (
        <div className='header' style={state.style}>
            <WidgetsRenderer widgets={ contextData.siteWidgets } position='header'/>
        </div>
    );
};
export default Header;


