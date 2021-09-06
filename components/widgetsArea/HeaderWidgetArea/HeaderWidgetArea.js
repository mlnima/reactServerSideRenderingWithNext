import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";

let StyledHeader = styled.header`
  grid-area: header;
  background-color: var(--header-background-color);
  .header-content{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 5px;
  }
  @media only screen and (min-width: 768px){
    .header-content{
      //justify-content: space-between;
    }
  }
  
  
  
  
  ${props => props.stylesData ?? ''}
`;

const HeaderWidgetArea = ({postElementStyle, postElementSize, stylesData, className, position, isMobile, currentPageSidebar, referer, widgets, rendering, postElementImageLoaderType, postElementImageLoader}) => {
    return (
        <StyledHeader stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='header-content'>
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

        </StyledHeader>
    );
};
export default HeaderWidgetArea;
