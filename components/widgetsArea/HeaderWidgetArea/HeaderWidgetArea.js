import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";

let StyledHeader = styled.header`
  grid-area: header;
  background-color: var(--header-background-color,#000);
  .header-content{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 5px;
  }
  ${props => props.stylesData ?? ''}
`;

const HeaderWidgetArea = ({ stylesData, className, position, isMobile, currentPageSidebar, referer, rendering}) => {
    return (
        <StyledHeader stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='header-content'>
                <WidgetsRenderer
                    currentPageSidebar={currentPageSidebar}
                    isMobile={isMobile}
                    rendering={rendering}
                    position={position}
                    referer={referer}
                />
            </div>

        </StyledHeader>
    );
};
export default HeaderWidgetArea;
