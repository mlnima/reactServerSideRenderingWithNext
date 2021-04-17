
import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledHeader = styled.header`${props => props.stylesData ?? ''}`

const HeaderWidgetArea = props => {
    return (
        <StyledHeader stylesData={props?.stylesData ?? ''} className={props.className + ' widget-area ' + props.position}>
            <WidgetsRenderer currentPageSidebar={props.currentPageSidebar} isMobile={props.isMobile} {...props} position={props.position} referer={props.referer}/>
        </StyledHeader>
    );
};
export default HeaderWidgetArea;
