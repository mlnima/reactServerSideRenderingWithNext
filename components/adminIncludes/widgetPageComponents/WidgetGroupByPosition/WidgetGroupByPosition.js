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
        <style jsx>{`
        .widgetAdminPanelItem {
        background-color: transparent;
        width: 100%;
        position: initial;
        margin: 5px;
        }
        .widgetAdminPanelItem>.widgetAdminPanelItemHeader {
        height:50px ;
        margin: 0;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
        font-weight: bold;
        font-size: large;
        }
        
        @media only screen and (min-width: 768px) {
        .widgetAdminPanelItem {
        width: 450px;
        position: relative;
        }
        }
        `}</style>
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
