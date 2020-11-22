import React, {useEffect, useState, useContext, useRef} from 'react';
import {convertVariableNameToName} from "../../../../_variables/_variables";
import WidgetModel from "../../widgetsModel/WidgetModel/WidgetModel";
import {AppContext} from "../../../../context/AppContext";

const WidgetGroupByPosition = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);


    const renderWidgets = props.widgets.map(widget => {

        const dataWithIndex = {
            data: {
                ...widget.data,
                widgetIndex: widget.data.widgetIndex ? widget.data.widgetIndex : props.widgetsInGroupByPosition.indexOf(widget)
            }
        }
        const widgetData = {...widget, ...dataWithIndex}

        return (
            <WidgetModel
                key={contextData.widgetsSettings.widgets.indexOf(widget)}
                isPost={false}
                widgetId={widgetData._id}
                data={widgetData.data}
                customPages={props.customPages}
                getAndSetWidgetsData={props.getAndSetWidgetsData}
                translationLanguages={props.siteIdentity.translationLanguages || []}
            />
        )
    })


    return (
        <div className='widgetAdminPanelItem' key={props.position}>
            <p className='widgetAdminPanelItemHeader'>{convertVariableNameToName(props.position)}</p>
            {renderWidgets}
        </div>
    );
};
export default WidgetGroupByPosition;
