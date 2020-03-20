import React, { useEffect, useState, useContext } from 'react';
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetText from "./WidgetText/WidgetText";

const Widget = props => {

    const RenderComponent = () => {
        if (props.component) {
            return (
                <props.component  { ...props }/>
            )
        } else return null
    }

    return (
        <div className='Widget'>
            <WidgetHeader { ...props }/>
            <WidgetText { ...props }/>
            <RenderComponent/>
            <WidgetFooter  { ...props }/>
        </div>
    );
};
export default Widget;