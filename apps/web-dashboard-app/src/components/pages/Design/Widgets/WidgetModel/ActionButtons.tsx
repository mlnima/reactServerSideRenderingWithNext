import React, {FC} from "react";
import ExportWidget from './ExportWidget/ExportWidget'
import {useSelector} from "react-redux";
import {DashboardStore, Store, Widget} from "typescript-types";
// import updateRouteQuery from "@_variables/_clientVariables/clientVariables/updateRouteQuery";
import {createNewWidgetAction, deleteWidgetAction, updateWidgetAction} from "@store/reducers/widgetsReducer";
import {useAppDispatch} from "@store/hooks";
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
                posts: [],
                metaData: []
            }
        }))
            // .then(()=>updateRouteQuery(router))
    };

    const onCloneHandler = () => {

        const widgetsInTheSamePosition = widgets?.[widgetData.position]
            ?.filter((widget: Widget) => widget?.data?.position === widgetData.position)

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
                {/*<SvgRenderer svgUrl={'/asset/images/icons/floppy-disk-solid.svg'}*/}
                {/*             size={20}*/}
                {/*             color={'var(--primary-button-link-text-color, #000)'}/>*/}
                <FontAwesomeIcon icon={faFloppyDisk} className={'meta-icon'}/>

            </button>


            <ExportWidget widgetData={widgetData}/>
            <button className={'btn btn-primary'} title="clone" onClick={() => onCloneHandler()}>
                {/*<SvgRenderer svgUrl={'/asset/images/icons/clone-solid.svg'}*/}
                {/*             size={20}*/}
                {/*             color={'var(--primary-button-link-text-color, #000)'}/>*/}
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
                {/*<SvgRenderer svgUrl={'/asset/images/icons/trash-can-solid.svg'}*/}
                {/*             size={20}*/}
                {/*             color={'var(--primary-button-link-text-color, #000)'}/>*/}
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
