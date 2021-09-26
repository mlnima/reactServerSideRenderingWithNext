import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";
let StyledSideBar = styled.aside`
background-color: var(--sidebar-background-color,#18181b);
${props => props.stylesData ?? ''}
`

const SideBarWidgetArea = ({postElementStyle,postElementSize,stylesData,className,position,isMobile,currentPageSidebar,referer,widgets,rendering,gridArea,postElementImageLoaderType,postElementImageLoader}) => {
    return (
        <StyledSideBar stylesData={stylesData ?? ''} className={className + ' widget-area ' + position} style={{gridArea}}>
            <WidgetsRenderer
                currentPageSidebar={currentPageSidebar}
                isMobile={isMobile}
                widgets={widgets}
                rendering={rendering}
                position={position}
                referer={referer}
                postElementSize={postElementSize}
                postElementStyle={postElementStyle}
                postElementImageLoaderType={postElementImageLoaderType}
                postElementImageLoader={postElementImageLoader}
            />
        </StyledSideBar>
    );
};
export default SideBarWidgetArea;
