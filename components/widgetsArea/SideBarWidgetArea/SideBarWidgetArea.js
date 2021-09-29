import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";
let StyledSideBar = styled.aside`
background-color: var(--sidebar-background-color,#18181b);
${props => props.stylesData ?? ''}
`

const SideBarWidgetArea = ({stylesData,className,position,isMobile,currentPageSidebar,referer,rendering,gridArea}) => {
    return (
        <StyledSideBar stylesData={stylesData ?? ''} className={className + ' widget-area ' + position} style={{gridArea}}>
            <WidgetsRenderer
                currentPageSidebar={currentPageSidebar}
                isMobile={isMobile}
                rendering={rendering}
                position={position}
                referer={referer}
            />
        </StyledSideBar>
    );
};
export default SideBarWidgetArea;
