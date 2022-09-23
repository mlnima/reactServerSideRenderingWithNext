import React, {FC,memo} from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";

let StyledMain = styled.main`
  //grid-area: primary;
  width: 100%;
  min-height: 100vh;
`;


interface MainWidgetAreaPropTypes {
    className?:string,
    id?:string,
    position:string,
}

const MainWidgetArea:FC<MainWidgetAreaPropTypes> = ({className,position}) => {

    return (
        <StyledMain id={'primary'} className={className + ' widget-area ' + position}>
            <WidgetsRenderer
                position={position}
            />
        </StyledMain>
    );

};
export default memo(MainWidgetArea);
