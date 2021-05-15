import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledMain = styled.main`${props => props.stylesData ?? ''}`;

const MainWidgetArea = ({postElementStyle,postElementSize,stylesData,className,position,isMobile,currentPageSidebar,referer,widgets,rendering,postElementImageLoaderType,postElementImageLoader}) => {

    return (
        <StyledMain stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
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
        </StyledMain>
    );
};
export default MainWidgetArea;
