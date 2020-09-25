import React, {useContext} from 'react';
import styled from "styled-components";
import {AppContext} from "../../../context/AppContext";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import './WidgetArea.scss';
let StyledDiv = styled.div`${props => props.stylesData}`
const WidgetArea = props => {
    const contextData = useContext(AppContext);
    if (contextData.siteWidgets.filter(i=>i.data.position === props.position).length > 0){
        return (
            <StyledDiv stylesData={props.stylesData} className={props.className + ' widget-area'} >
                <WidgetsRenderer widgets={contextData.siteWidgets} position={props.position}/>
            </StyledDiv>
        );
    }else return null

};
export default WidgetArea;
