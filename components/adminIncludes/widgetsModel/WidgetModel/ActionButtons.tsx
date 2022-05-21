import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClone, faSave} from "@fortawesome/free-regular-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ExportWidget from './ExportWidget/ExportWidget'
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import { WidgetPropTypes} from "@_variables/TypeScriptTypes/Widgets";
import {
    fetchAdminPanelAddNewWidget,
    fetchAdminPanelDeleteWidget, fetchAdminPanelUpdateWidget
} from "@store_toolkit/adminReducers/adminWidgetsReducer";
import {useAppDispatch} from "@store_toolkit/hooks";


interface ActionButtonsPropTypes {
    widgetData:any,
    widgetSettings:any,
    setWidgetSettings:any,
    widgetId:string

}

const ActionButtons: FC<ActionButtonsPropTypes> = ({widgetData,widgetId,widgetSettings,setWidgetSettings}) => {
    const dispatch = useAppDispatch()
    const widgets = useSelector(({adminPanelWidgets}:StoreTypes) => adminPanelWidgets?.adminPanelWidgets || [])

    const onSaveHandler = () => {
        dispatch(fetchAdminPanelUpdateWidget({
            _id: widgetId,
            data: {
                ...widgetData,
                posts: [],
                metaData: []
            }
        }))
    };

    const onCloneHandler = () => {

        const widgetsInTheSamePosition = widgets?.[widgetData.position]
                    ?.filter((widget:WidgetPropTypes) => widget?.data?.position === widgetData.position)
        
        const highestIndexInTheSamePosition = Math.max(...widgetsInTheSamePosition.map(() => widgetData.widgetIndex), 0)

        dispatch(fetchAdminPanelAddNewWidget({
            ...widgetData,
            widgetIndex: highestIndexInTheSamePosition + 1,
            posts: [],
            metaData: []
        }))
    }


    const onDeleteHandler = () => {
        if (widgetId) {
            dispatch(fetchAdminPanelDeleteWidget({_id:widgetId, position:widgetData.position}))
        }
    };

    return (
        <div className='control-buttons'>
            <button className={'btn btn-primary'} title="save" onClick={() => onSaveHandler()}>
                <FontAwesomeIcon icon={faSave} style={{
                    width: '15px',
                    height: '15px'
                }}/></button>
            <ExportWidget data={{...widgetData}}/>
            <button className={'btn btn-primary'} title="clone" onClick={() => onCloneHandler()}>
                <FontAwesomeIcon icon={faClone} style={{
                    width: '15px',
                    height: '15px'
                }}/></button>
            <button className={'btn btn-primary'} title="delete"
                    onClick={() => widgetSettings.renderDeleteBtn ? setWidgetSettings({
                        ...widgetSettings,
                        renderDeleteBtn: false
                    }) : setWidgetSettings({
                        ...widgetSettings,
                        renderDeleteBtn: true
                    })}>
                <FontAwesomeIcon icon={faTrash} style={{width: '15px', height: '15px'}}/>
            </button>
            {widgetSettings.renderDeleteBtn ?
                <button className={'btn btn-danger'} onClick={() => onDeleteHandler()}>
                    Delete
                </button>
                : null
            }
        </div>
    )
};
export default ActionButtons
