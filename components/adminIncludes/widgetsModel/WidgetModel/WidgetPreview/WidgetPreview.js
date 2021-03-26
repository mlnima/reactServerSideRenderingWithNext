import React from 'react';
import WidgetsRenderer from "../../../../includes/WidgetsRenderer/WidgetsRenderer";

const WidgetPreview = props => {
        return (
            <WidgetsRenderer widgets={[{data:props.widgetData}]} position={props.position} />
        );
};
export default WidgetPreview;
