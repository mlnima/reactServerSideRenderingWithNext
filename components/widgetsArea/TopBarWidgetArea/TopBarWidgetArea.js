import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";
let StyledDiv = styled.div`
  grid-area: topbar;
  background-color: var(--topbar-background-color);
  .top-bar-content{
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
`

const TopBarWidgetArea = ({postElementStyle,postElementSize,stylesData,className,position,isMobile,currentPageSidebar,referer,widgets,rendering,postElementImageLoaderType,postElementImageLoader}) => {
    return (
        <StyledDiv stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='top-bar-content'>
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
        </StyledDiv>
    );
};
export default TopBarWidgetArea;
