import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

let StyledDiv = styled.div`
  grid-area: topbar;
  background-color: var(--topbar-background-color,#18181b);

  .top-bar-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    min-height: 48px;
    margin: 0 5px;
  }

  @media only screen and (min-width: 768px) {
    height: 48px;
    .top-bar-content {
      height: 48px;
    }
  }
  ${(props:{stylesData:string}) => props.stylesData ?? ''}
`

interface TopBarWidgetAreaProps {
    postElementStyle: string;
    postElementSize: string;
    stylesData: string;
    className: string;
    position: string;
    postElementImageLoaderType: string;
    postElementImageLoader: string;
    isMobile: boolean;
    currentPageSidebar: boolean;
    referer: boolean;
    rendering: boolean;
    widgets: WidgetPropTypes[]
}


const TopBarWidgetArea = (
    {stylesData,className,position,isMobile,currentPageSidebar,referer}:TopBarWidgetAreaProps
) => {
    return (
        <StyledDiv stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='top-bar-content'>
                <WidgetsRenderer
                    currentPageSidebar={currentPageSidebar}
                    isMobile={isMobile}
                    position={position}
                    referer={referer}
                />
            </div>
        </StyledDiv>
    );
};
export default TopBarWidgetArea;
