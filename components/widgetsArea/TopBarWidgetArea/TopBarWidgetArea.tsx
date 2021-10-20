import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

let StyledDiv = styled.div`
  grid-area: topbar;
  background-color: var(--topbar-background-color,#000);
  height: 56px;
  display: flex;
  align-items: center;
  .top-bar-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 5px;
    width: 100%;
  }

  @media only screen and (min-width: 768px) {

    .top-bar-content {
   
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
    referer: boolean;
    rendering: boolean;
    widgets: WidgetPropTypes[]
}


const TopBarWidgetArea = (
    {stylesData,className,position,referer}:TopBarWidgetAreaProps
) => {
    return (
        <StyledDiv stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='top-bar-content'>
                <WidgetsRenderer
                    position={position}
                    referer={referer}
                />
            </div>
        </StyledDiv>
    );
};
export default TopBarWidgetArea;
