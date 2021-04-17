import React,{useState} from 'react';
import {convertVariableNameToName} from "../../../../_variables/_variables";
import WidgetModel from "../../widgetsModel/WidgetModel/WidgetModel";
import _ from "lodash";

const WidgetGroupByPosition = props => {
    const [open,setOpen]=useState(true)
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
                key={_.uniqueId('id_')}
                widgetId={widgetData._id}
                data={widgetData.data}
                customPages={props.customPages}
                getAndSetWidgetsData={props.getAndSetWidgetsData}
                translationLanguages={props.siteIdentity.translationLanguages || []}
            />
        )
    })
    const onOpenHandler = () => {
        open ? setOpen(false) : setOpen(true)
    }
    return (
        <div className='widgetAdminPanelItem'>
            <p className='widgetAdminPanelItemHeader' onClick={onOpenHandler}>{convertVariableNameToName(props.position)}</p>
            {open?
                <>
                {renderWidgets}
                </>
                :null}

        </div>
    );
};
export default WidgetGroupByPosition;
