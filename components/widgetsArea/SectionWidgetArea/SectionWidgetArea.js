import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledSection = styled.section`${props => props.stylesData ?? ''}`

const SectionWidgetArea = ({stylesData,className,position,isMobile,currentPageSidebar,referer,rendering}) => {
    return (
        <StyledSection stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <WidgetsRenderer
                currentPageSidebar={currentPageSidebar}
                isMobile={isMobile}
                rendering={rendering}
                position={position}
                referer={referer}
            />
        </StyledSection>
    );
};
export default SectionWidgetArea;
