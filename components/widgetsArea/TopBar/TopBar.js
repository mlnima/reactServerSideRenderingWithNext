import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../../context/AppContext";
import {withRouter} from "next/router";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import './TopBar.scss'

let StyledDiv = styled.div`${props => props.customStyles}`

const TopBar = () => {
    const contextData = useContext(AppContext);

    useEffect(() => {
        console.log(contextData.siteDesign)
    }, [contextData]);

    if (contextData.siteIdentity.topBarVisibility || ((contextData.navigationData || []).length > 0) && contextData.state.isMobile) {
        return (
            <StyledDiv customStyles={contextData.siteDesign.topBarStyle ? contextData.siteDesign.topBarStyle : ''} className='top-bar'>
                <div className='top-bar-items'>
                    <WidgetsRenderer widgets={contextData.siteWidgets} position='topBar'/>
                </div>
            </StyledDiv>
        )
    } else return null

};

export default withRouter(TopBar);
