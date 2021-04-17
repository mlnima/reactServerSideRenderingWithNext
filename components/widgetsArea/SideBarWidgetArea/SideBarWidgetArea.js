//SideBarWidgetArea
import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledSideBar = styled.aside`${props => props.stylesData ?? ''}`

const SideBarWidgetArea = props => {
    return (
        <StyledSideBar stylesData={props?.stylesData ?? ''} className={props.className + ' widget-area ' + props.position}>
            <WidgetsRenderer currentPageSidebar={props.currentPageSidebar} isMobile={props.isMobile} {...props} position={props.position} referer={props.referer}/>
        </StyledSideBar>
    );
};
export default SideBarWidgetArea;
