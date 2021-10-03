import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

let StyledNavigation = styled.nav`
  grid-area: navigation;
  background-color: var(--navigation-background-color,#000);
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
  ${(props:{stylesData:string}) => props.stylesData ?? ''}
`;

interface NavigationWidgetAreaProps {
    postElementStyle: string;
    postElementSize: string;
    stylesData: string;
    className: string;
    position: string;
    postElementImageLoaderType: string;
    postElementImageLoader: string;
    isMobile: boolean;
    referer: boolean;
    rendering: boolean;
    widgets: WidgetPropTypes[]
}

const NavigationWidgetArea = ({ stylesData, className, position, isMobile, referer,  rendering}:NavigationWidgetAreaProps) => {
    return (
        <StyledNavigation stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='navigation-content'>
            <WidgetsRenderer
                isMobile={isMobile}
                rendering={rendering}
                position={position}
            />
            </div>
        </StyledNavigation>
    );
};
export default NavigationWidgetArea;
