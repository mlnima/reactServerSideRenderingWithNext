import React from 'react';
import WidgetsRenderer from "../../../../includes/WidgetsRenderer/WidgetsRenderer";

const WidgetPreview = ({widgetId,position}) => {
        return (
            <WidgetsRenderer  _id={widgetId} position={position} />
        );
};
export default WidgetPreview;
