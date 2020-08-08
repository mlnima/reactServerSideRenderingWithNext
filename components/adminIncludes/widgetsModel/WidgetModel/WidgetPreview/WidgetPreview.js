import React, {useEffect, useState, useContext, useRef} from 'react';
import WidgetsRenderer from "../../../../includes/WidgetsRenderer/WidgetsRenderer";

const WidgetPreview = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);

    if (props.preview){
        return (
            <WidgetsRenderer widgets={[props.widgetData]} position={props.position} />
        );
    }else return null

};
export default WidgetPreview;
