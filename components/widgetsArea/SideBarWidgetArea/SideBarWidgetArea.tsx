import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import React from "react";

let StyledSideBar = styled.aside`
  background-color: var(--sidebar-background-color,#18181b);
  ${(props:{gridArea:string})  => `grid-area:${props.gridArea ||''}` } ;
`
interface SideBarWidgetAreaProps {
    className: string;
    position: string;
    gridArea:string;
}

const SideBarWidgetArea = ({className,position,gridArea}:SideBarWidgetAreaProps) => {
    return (
        <StyledSideBar className={className + ' widget-area ' + position}  gridArea={gridArea}>
            <WidgetsRenderer
                position={position}
                isSidebar={true}
            />
        </StyledSideBar>
    );
};

export default SideBarWidgetArea;
