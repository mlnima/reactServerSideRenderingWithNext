import React from 'react';
import WidgetsRenderer from "../../../../includes/WidgetsRenderer/WidgetsRenderer";

const WidgetPreview = props => {

    if (props.preview){
        return (
            <WidgetsRenderer widgets={[{data:props.widgetData}]} position={props.position} />
        );
    }else return null

};
export default WidgetPreview;
