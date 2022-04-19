import React, {FC} from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";

let StyledMain = styled.main`
  grid-area: main;
  min-height: 100vh;
  ${(props:{stylesData:string}) => props.stylesData ?? ''}
`;


interface MainWidgetAreaPropTypes {
    stylesData:string,
    className:string,
    position:string,
}

const MainWidgetArea:FC<MainWidgetAreaPropTypes> = ({stylesData,className,position}) => {

    return (
        <StyledMain id={'main-content'} stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <WidgetsRenderer
                position={position}
            />
        </StyledMain>
    );

};
export default MainWidgetArea;
