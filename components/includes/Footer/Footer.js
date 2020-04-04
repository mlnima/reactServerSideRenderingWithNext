import React, { useEffect, useState, useContext, useRef } from 'react';
import './Footer.scss'
import { AppContext } from '../../../context/AppContext'
import WidgetsRenderer from '../WidgetsRenderer/WidgetsRenderer'

const Footer = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style:{}
    });
    useEffect(() => {
        setState({
            ...state,
            style:{
                backgroundColor:contextData.siteDesign.footerBackgroundColor,
                color:contextData.siteDesign.footerTextColor
            }
        })
    }, [contextData.siteDesign]);

    return (
        <div id='footer' style={state.style}>
            <WidgetsRenderer { ...props } />
        </div>
    );
};
export default Footer;
