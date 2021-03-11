import React, { useEffect, useState, useContext, useRef } from 'react';
import WidgetsRenderer from '../../includes/WidgetsRenderer/WidgetsRenderer'
import './Footer.scss'

const Footer = props => {
    return (
        <div id='footer' >
            <WidgetsRenderer { ...props } />
        </div>
    );
};
//export default Footer;