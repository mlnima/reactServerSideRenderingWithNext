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
    })
    //
    // useEffect(() => {
    //     window.innerWidth >= 768 ?
    //         setState({
    //             ...state,
    //             isMobile: false,
    //         }) :
    //         setState({
    //             ...state,
    //             isMobile: true,
    //         })
    // }, [props]);
    //


    useEffect(() => {
        if ( window.innerWidth >= 768) {
            setState({
                ...state,
                extraClassName: props.data.extraClassName,
                isMobile: false,
            })
        }else if (window.innerWidth < 768){
            setState({
                ...state,
                isMobile: true,
            })
        }
    }, [props]);




    const RenderComponent = () => {
        if (props.component) {
            return (
                <props.component  {...props.data} id={props._id} widget={true}/>
            )
        } else return null
    }



    const conditionalWidgetRenderer = (deviceType, languageToRender, activeLanguage) => {

        // console.log(
        //     props.data.name,
        //     state.isMobile,
        //     props.data.deviceTypeToRender,
        //     props.data.languageToRender,
        //     contextData.state.activeLanguage)

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
    // if (
    //     (!props.data.deviceTypeToRender && !props.data.languageToRender) || (props.data.deviceTypeToRender === 'all' || props.data.languageToRender === 'all') ||
    //     (state.isMobile && props.data.deviceTypeToRender === 'mobile' && props.data.languageToRender === contextData.state.activeLanguage) ||
    //     (!state.isMobile && props.data.deviceTypeToRender === 'desktop' && props.data.languageToRender === contextData.state.activeLanguage)
    //
    // )
    if (conditionalWidgetRenderer(props.data.deviceTypeToRender, props.data.languageToRender, contextData.state.activeLanguage)) {
        return (

            <StyledDiv customStyles={props.data.customStyles ? props.data.customStyles : ''} className={'widget ' + state.extraClassName}>
                <WidgetHeader {...props.data}/>
                <WidgetText {...props.data}/>
                <RenderComponent/>
                <WidgetFooter  {...props.data}/>
            </StyledDiv>

        );
    } else return null


};
export default Widget;

