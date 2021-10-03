import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

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
  ${(props:{stylesData:string}) => props.stylesData ?? ''}
`;

interface HeaderWidgetAreaProps {
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

const HeaderWidgetArea = ({ stylesData, className, position, isMobile, referer, rendering}:HeaderWidgetAreaProps) => {
    return (
        <StyledHeader stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='header-content'>
                <WidgetsRenderer
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
