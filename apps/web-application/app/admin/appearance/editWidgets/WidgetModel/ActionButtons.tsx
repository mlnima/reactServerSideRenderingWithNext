import React, {FC} from "react";
import ExportWidget from './ExportWidget/ExportWidget'
import {useSelector} from "react-redux";
import {DashboardStore, IWidget} from "@repo/typescript-types";
// import updateRouteQuery from "@_updateWidgetVariables/_clientVariables/clientVariables/updateRouteQuery";
import {createNewWidgetAction, deleteWidgetAction, updateWidgetAction} from "@storeDashboard//reducers/widgetsReducer";
import {useAppDispatch} from "@storeDashboard/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons/faFloppyDisk";
import {faClone} from "@fortawesome/free-solid-svg-icons/faClone";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";



interface ActionButtonsPropTypes {
    widgetData: any,
    widgetSettings: any,
    setWidgetSettings: any,
    widgetId: string

}

const ActionButtons: FC<ActionButtonsPropTypes> = ({widgetData, widgetId, widgetSettings, setWidgetSettings}) => {
    const dispatch = useAppDispatch()

    const widgets = useSelector(({widgets}: DashboardStore) => widgets?.adminPanelWidgets || [])

    const onSaveHandler = () => {
        dispatch(updateWidgetAction({
            _id: widgetId,
            data: {
                ...widgetData,
                uniqueData:{
                    ...widgetData.uniqueData,
                    categoriesDataWithPosts:[],
                    tagsDataWithPosts:[],
                    ActorsDataWithPosts:[],
                    posts: [],
                    metaData: []
                },
                posts: [],
                metaData: []
            }
        }))
            // .then(()=>updateRouteQuery(router))
    };

    const onCloneHandler = () => {

        const widgetsInTheSamePosition = widgets?.[widgetData.position]
            ?.filter((widget: IWidget) => widget?.data?.position === widgetData.position)

        const highestIndexInTheSamePosition = Math.max(...widgetsInTheSamePosition.map(() => widgetData.widgetIndex), 0)

        dispatch(createNewWidgetAction({
            ...widgetData,
            widgetIndex: highestIndexInTheSamePosition + 1,
            posts: [],
            metaData: []
        }))
    }


    const onDeleteHandler = () => {
        if (widgetId) {
            dispatch(deleteWidgetAction({_id: widgetId, position: widgetData.position}))

        }
    };

    return (
        <div className='control-buttons'>
            <button className={'btn btn-primary'} title="save" onClick={() => onSaveHandler()}>
                <FontAwesomeIcon icon={faFloppyDisk} className={'meta-icon'}/>
            </button>


            <ExportWidget widgetData={widgetData}/>
            <button className={'btn btn-primary'} title="clone" onClick={() => onCloneHandler()}>
                <FontAwesomeIcon icon={faClone} className={'meta-icon'}/>
            </button>
            <button className={'btn btn-primary'} title="delete"
                    onClick={() => widgetSettings.renderDeleteBtn ? setWidgetSettings({
                        ...widgetSettings,
                        renderDeleteBtn: false
                    }) : setWidgetSettings({
                        ...widgetSettings,
                        renderDeleteBtn: true
                    })}>
                <FontAwesomeIcon icon={faTrash} className={'meta-icon'}/>
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
