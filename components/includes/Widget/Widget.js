import React, {useEffect, useState, useContext} from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import './Widget.scss';
import styled, {ThemeProvider} from "styled-components";

const Widget = props => {

    const [state, setState] = useState({
        extraClassName: '',
        isMobile: true,
        navigationOpenStatus: true
    })

    useEffect(() => {
        window.innerWidth >= 768 ?
            setState({
                ...state,
                isMobile: false,
            }) :
            setState({
                ...state,
                isMobile: true,
            })
    }, [props]);

    const RenderComponent = () => {
        if (props.component) {
            return (
                <props.component  {...props.data} widget={true}/>
            )
        } else return null
    }

    useEffect(() => {
        if (props.data.extraClassName) {
            setState({
                ...state,
                extraClassName: props.data.extraClassName
            })
        }
    }, [props]);


    useEffect(() => {

        if(props.data.customStyles){
            console.log(props.data.customStyles)
        }

    }, [props]);


    const StyledDiv = props.data.customStyles ? styled.div`${props.data.customStyles}` : styled.div``

    if (!props.data.deviceTypeToRender || props.data.deviceTypeToRender === 'all' || (state.isMobile && props.data.deviceTypeToRender === 'mobile') || (!state.isMobile && props.data.deviceTypeToRender === 'desktop')) {
        return (

            <StyledDiv className={'widget ' + state.extraClassName}>
                <WidgetHeader {...props.data}/>
                <WidgetText {...props.data}/>
                <RenderComponent/>
                <WidgetFooter  {...props.data}/>
            </StyledDiv>

        );
    } else return null


};
export default Widget;

