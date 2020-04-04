import React, { useEffect, useState, useContext } from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";
import WidgetPagination from './WidgetPagination/WidgetPagination'
import { AppContext } from '../../../context/AppContext'

const Widget = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style: {}
    });


    useEffect(() => {
        setState({
            ...state,
            style:{
                backgroundColor:contextData.siteDesign.widgetBodyBackgroundColor,
                color:contextData.siteDesign.widgetBodyTextColor,
                border:contextData.siteDesign.widgetBodyBorder
            }
        })
    }, [contextData.siteDesign]);



    const RenderComponent = () => {
        if (props.component) {
            return (
                <props.component  { ...props } widget={true}/>
            )
        } else return null
    }

    return (
        <div className='Widget' style={state.style}>
            <WidgetHeader { ...props }/>
            <WidgetText { ...props }/>
            <RenderComponent/>
            <WidgetFooter  { ...props }/>
        </div>
    );
};
export default Widget;