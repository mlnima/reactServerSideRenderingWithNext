import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";

let StyledSideBar = styled.aside`
  background-color: var(--secondary-background-color,#181818);
  display: flex;
  flex-direction: column;
  ${(props:{gridArea:string})  => `grid-area:${props.gridArea ||''}` } ;
`
interface SideBarWidgetAreaProps {
    className: string;
    position: string;
    gridArea:string;
}

const SidebarWidgetArea = ({className,position,gridArea}:SideBarWidgetAreaProps) => {
    return (
        <StyledSideBar className={className + ' widget-area ' + position}  gridArea={gridArea}>
            <WidgetsRenderer
                position={position}
            />
        </StyledSideBar>
    );
};

export default memo(SidebarWidgetArea);
