import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";

let StyledSideBar = styled.aside`
  background-color: var(--main-background-color,#000);
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
