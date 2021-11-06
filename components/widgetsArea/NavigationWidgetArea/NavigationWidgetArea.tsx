import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

let StyledNavigation = styled.nav`
  grid-area: navigation;
  background-color: var(--navigation-background-color,#000);
  height: 56px;
  display: flex;
  align-items: center;
  .navigation-content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 5px;
    padding: 0 5px;
    width: 100%;
    height: 100%;
  }
  @media only screen and (min-width: 768px){
    .navigation-content{
      align-items: center;
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
    referer: boolean;
    rendering: boolean;
    widgets: WidgetPropTypes[]
}

const NavigationWidgetArea = ({ stylesData, className, position,  rendering}:NavigationWidgetAreaProps) => {
    return (
        <StyledNavigation stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='navigation-content'>
            <WidgetsRenderer
                rendering={rendering}
                position={position}
            />
            </div>
        </StyledNavigation>
    );
};
export default NavigationWidgetArea;
