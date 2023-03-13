import React, {FC, memo} from 'react';
import styled from "styled-components";
import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";

let StyledMain = styled.main`
  width: 100%;
  min-height: 100vh;
`;

interface MainWidgetAreaPropTypes {
    className?: string,
    id?: string,
    position: string,
}

const MainWidgetArea: FC<MainWidgetAreaPropTypes> = ({className, position}) => {

    return (
        <StyledMain id={'primary'} className={className + ' widget-area ' + position}    suppressHydrationWarning={true}  >
            <WidgetsRenderer position={position} />
        </StyledMain>
    );

};
export default memo(MainWidgetArea);
