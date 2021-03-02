import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../../context/AppContext'
import WidgetsRenderer from '../../includes/WidgetsRenderer/WidgetsRenderer'
import styled from "styled-components";
import './Header.scss'
let StyledDiv = styled.div`${props => props.customStyles}`
const Header = () => {
    const contextData = useContext(AppContext);
    return (
        <StyledDiv customStyles={contextData.siteDesign.headerStyle ? contextData.siteDesign.headerStyle : ''} className='header' >
            <WidgetsRenderer widgets={contextData.siteWidgets} position='header'/>
        </StyledDiv>
    );
};
export default Header;


