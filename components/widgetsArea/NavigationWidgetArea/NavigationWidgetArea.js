import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";

let StyledNavigation = styled.nav`
  grid-area: navigation;
  background-color: var(--navigation-background-color);
  .navigation-content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    min-height: 48px;
    margin: 0 5px;
  }
  @media only screen and (min-width: 768px){
    height: 48px;
  }
  ${props => props.stylesData ?? ''}
`;

const NavigationWidgetArea = ({postElementStyle, postElementSize, stylesData, className, position, isMobile, currentPageSidebar, referer, widgets, rendering, postElementImageLoaderType, postElementImageLoader}) => {
    return (
        <StyledNavigation stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='navigation-content'>
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
            </div>
        </StyledNavigation>
    );
};
export default NavigationWidgetArea;
