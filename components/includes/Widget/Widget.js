import React, {useEffect, useState, useContext} from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";

import styled, {ThemeProvider} from "styled-components";
import {AppContext} from "../../../context/AppContext";

let StyledDiv = styled.div`${props => props.customStyles}`


const Widget = props => {
    const contextData = useContext(AppContext);
    const [styles, setStyles] = useState('')

    useEffect(() => {
        if (props.data?.customStyles){
            setStyles(props.data?.customStyles)
        }
    }, [props.data?.customStyles]);
    const RenderComponent = () => {
        if (props.component) {
            return (
                <props.component currentPageSidebar={props.currentPageSidebar} isMobile={props.isMobile} {...props.data} id={props._id} widget={true}/>
            )
        } else return null
    }


    const conditionalWidgetRenderer = (deviceType, languageToRender, activeLanguage) => {
        if ((!deviceType && !languageToRender) || (deviceType === 'all' || languageToRender === 'all')) {
            return true
        } else if ((deviceType === 'mobile' && props.isMobile && (languageToRender === activeLanguage || languageToRender === 'all' || !languageToRender))) {
            return true
        } else if ((deviceType === 'desktop' && !props.isMobile && (languageToRender === activeLanguage || languageToRender === 'all' || !languageToRender))) {
            return true
        } else if ((!deviceType && languageToRender && (languageToRender === activeLanguage || languageToRender === 'all'))) {
            return true
        } else return false
    }

    if (conditionalWidgetRenderer(props.data.deviceTypeToRender, props.data.languageToRender, contextData.state.activeLanguage)) {
        return (
            <StyledDiv customStyles={props.data?.customStyles ?? styles} className={'widget ' + (props.data?.extraClassName ?? '')} id={props.data?.extraId ?? ''}>
                <WidgetHeader {...props.data}/>
                <WidgetText {...props.data}/>
                <RenderComponent/>
                <WidgetFooter  {...props.data}/>
            </StyledDiv>
        );
    } else return null


};
export default Widget;

