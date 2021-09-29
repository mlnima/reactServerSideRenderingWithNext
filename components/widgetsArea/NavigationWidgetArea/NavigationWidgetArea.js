import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";

let StyledNavigation = styled.nav`
  grid-area: navigation;
  background-color: var(--navigation-background-color,#18181b);
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
    .navigation-content{
      height: 48px;
    }
  }
  ${props => props.stylesData ?? ''}
`;

const NavigationWidgetArea = ({ stylesData, className, position, isMobile, currentPageSidebar, referer,  rendering}) => {
    return (
        <StyledNavigation stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='navigation-content'>
            <WidgetsRenderer
                currentPageSidebar={currentPageSidebar}
                isMobile={isMobile}
                rendering={rendering}
                position={position}
                referer={referer}
            />
            </div>
        </StyledNavigation>
    );
};
export default NavigationWidgetArea;
