import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledFooter = styled.footer`${props => props.stylesData ?? ''}`

const FooterWidgetArea = props => {
    return (
        <StyledFooter stylesData={props?.stylesData ?? ''} className={props.className + ' widget-area ' + props.position}>
            <WidgetsRenderer currentPageSidebar={props.currentPageSidebar} isMobile={props.isMobile} {...props} position={props.position} referer={props.referer}/>
        </StyledFooter>
    );
};
export default FooterWidgetArea;
