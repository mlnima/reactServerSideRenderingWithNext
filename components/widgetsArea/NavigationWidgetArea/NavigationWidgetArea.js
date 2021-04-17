import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledNavigation = styled.nav`${props => props.stylesData ?? ''}`

const NavigationWidgetArea = props => {
    return (
        <StyledNavigation stylesData={props?.stylesData ?? ''} className={props.className + ' widget-area ' + props.position}>
            <WidgetsRenderer currentPageSidebar={props.currentPageSidebar} isMobile={props.isMobile} {...props} position={props.position} referer={props.referer}/>
        </StyledNavigation>
    );
};
export default NavigationWidgetArea;
