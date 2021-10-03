import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";

let StyledMain = styled.main`
  grid-area: main;
  min-height: 100vh;
  ${(props:{stylesData:string}) => props.stylesData ?? ''}
`;

const MainWidgetArea = ({stylesData,className,position,isMobile,rendering}:any) => {

    return (
        <StyledMain stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <WidgetsRenderer
                isMobile={isMobile}
                rendering={rendering}
                position={position}
            />
        </StyledMain>
    );
};
export default MainWidgetArea;
