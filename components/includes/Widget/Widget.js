import React, {useEffect, useState, useContext} from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import './Widget.scss';
import styled, {ThemeProvider} from "styled-components";
import {AppContext} from "../../../context/AppContext";

let StyledDiv = styled.div`${props => props.customStyles}`


const Widget = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        extraClassName: '',
        isMobile: true,
        navigationOpenStatus: true,
        customStyles:''
    })

    useEffect(() => {
        if ( window.innerWidth >= 768) {
            setState({
                ...state,
                extraClassName: props.data.extraClassName,
                customStyles:props.data.customStyles ? props.data.customStyles : '',
                isMobile: false,
            })
        }else if (window.innerWidth < 768){
            setState({
                ...state,
                isMobile: true,
                customStyles:props.data.customStyles ? props.data.customStyles : '',
            })
        }
    }, [props]);

    const RenderComponent = () => {
        if (props.component) {
            return (
                <props.component  deviceWidth={props.deviceWidth} {...props.data} id={props._id} widget={true}/>
            )
        } else return null
    }

    const conditionalWidgetRenderer = (deviceType, languageToRender, activeLanguage) => {
        if ((!deviceType && !languageToRender) || (deviceType === 'all' || languageToRender === 'all')) {
            return true
        } else if ((deviceType === 'mobile' && state.isMobile && (languageToRender === activeLanguage || languageToRender === 'all'||!languageToRender))) {
            return true
        } else if ((deviceType === 'desktop' && !state.isMobile && (languageToRender === activeLanguage || languageToRender === 'all' ||!languageToRender))) {
            return true
        } else if ((!deviceType && languageToRender && (languageToRender === activeLanguage || languageToRender === 'all'))) {
            return true
        } else return false
    }

    if (conditionalWidgetRenderer(props.data.deviceTypeToRender, props.data.languageToRender, contextData.state.activeLanguage)) {
        return (
            <StyledDiv customStyles={state.customStyles} className={'widget ' + (state.extraClassName ?state.extraClassName :'') }>
                <WidgetHeader {...props.data}/>
                <WidgetText {...props.data}/>
                <RenderComponent/>
                <WidgetFooter  {...props.data}/>
            </StyledDiv>
        );
    } else return null


};
export default Widget;

