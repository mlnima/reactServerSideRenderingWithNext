import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";
let StyledHeader = styled.header`${props => props.stylesData ?? ''}`;

const HeaderWidgetArea = ({postElementStyle,postElementSize,stylesData,className,position,isMobile,currentPageSidebar,referer,widgets,rendering,postElementImageLoaderType,postElementImageLoader}) => {
    return (
        <StyledHeader stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
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
        </StyledHeader>
    );
};
export default HeaderWidgetArea;
