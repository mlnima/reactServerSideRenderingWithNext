import React, {useContext} from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledDiv = styled.div`${props => props.stylesData ?? ''}`

const WidgetArea = props => {
    if (props.widgets.length > 0 && props.rendering){
        return (
            <StyledDiv  stylesData={props.stylesData ?? ''} className={props.className + ' widget-area ' + props.position} >
                <WidgetsRenderer currentPageSidebar={props.currentPageSidebar}  isMobile={props.isMobile} {...props}  position={props.position}/>
            </StyledDiv>
        );
    }else return null
};
export default WidgetArea;
