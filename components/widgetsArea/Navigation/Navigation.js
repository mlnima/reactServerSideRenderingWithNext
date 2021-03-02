import React, { useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import withRouter from "next/dist/client/with-router";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import './Navigation.scss'
let StyledDiv = styled.div`${props => props.customStyles}`

const Navigation = () => {
    const contextData = useContext(AppContext);
        return (
            <StyledDiv customStyles={contextData.siteDesign.navigationStyle ? contextData.siteDesign.navigationStyle : ''} className='navigation' >
                    <WidgetsRenderer widgets={contextData.siteWidgets} position='navigation'/>
            </StyledDiv>
        );
};

export default withRouter(Navigation);
