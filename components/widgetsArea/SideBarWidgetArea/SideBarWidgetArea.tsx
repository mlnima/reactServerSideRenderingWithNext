import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
let StyledSideBar = styled.aside`
background-color: var(--sidebar-background-color,#18181b);
grid-area: ${(props:{gridArea:string})  => props.gridArea ||''} ;

`
//${(props:{stylesData:string,gridArea:string})  => props.stylesData ?? ''}
interface SideBarWidgetAreaProps {
    postElementStyle: string;
    postElementSize: string;
    stylesData: string;
    className: string;
    position: string;
    postElementImageLoaderType: string;
    postElementImageLoader: string;
    referer: boolean;
    rendering: boolean;
    gridArea:string;
    widgets: WidgetPropTypes[]
}

const SideBarWidgetArea = ({className,position,referer,rendering,gridArea}:SideBarWidgetAreaProps) => {
    return (
        <StyledSideBar className={className + ' widget-area ' + position}  gridArea={gridArea}>
            <WidgetsRenderer
                rendering={rendering}
                position={position}
                referer={referer}
            />
        </StyledSideBar>
    );
};
export default SideBarWidgetArea;
