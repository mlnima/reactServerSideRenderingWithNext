import {FC} from "react";
import ExportWidget from './ExportWidget/ExportWidget'
import {useSelector} from "react-redux";
import {
    fetchAdminPanelAddNewWidget,
    fetchAdminPanelDeleteWidget, fetchAdminPanelUpdateWidget
} from "@store_toolkit/adminReducers/adminWidgetsReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import {Widget} from "@_typeScriptTypes/widgets/Widget";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import {useRouter} from "next/router";
import updateRouteQuery from "@_variables/clientVariables/updateRouteQuery";



interface ActionButtonsPropTypes {
    widgetData: any,
    widgetSettings: any,
    setWidgetSettings: any,
    widgetId: string

}

const ActionButtons: FC<ActionButtonsPropTypes> = ({widgetData, widgetId, widgetSettings, setWidgetSettings}) => {
    const dispatch = useAdminDispatch()
    const router = useRouter()
    const widgets = useSelector(({adminPanelWidgets}: Store) => adminPanelWidgets?.adminPanelWidgets || [])

    const onSaveHandler = () => {
        dispatch(fetchAdminPanelUpdateWidget({
            _id: widgetId,
            data: {
                ...widgetData,
                posts: [],
                metaData: []
            }
        })).then(()=>updateRouteQuery(router))
    };

    const onCloneHandler = () => {

        const widgetsInTheSamePosition = widgets?.[widgetData.position]
            ?.filter((widget: Widget) => widget?.data?.position === widgetData.position)

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
            dispatch(fetchAdminPanelDeleteWidget({_id: widgetId, position: widgetData.position}))

        }
    };

    return (
        <div className='control-buttons'>
            <button className={'btn btn-primary'} title="save" onClick={() => onSaveHandler()}>
                <SvgRenderer svgUrl={'/public/asset/images/icons/floppy-disk-solid.svg'}
                             size={20}
                             color={'var(--primary-button-link-text-color, #000)'}/>

            </button>


            <ExportWidget data={{...widgetData}}/>
            <button className={'btn btn-primary'} title="clone" onClick={() => onCloneHandler()}>
                <SvgRenderer svgUrl={'/public/asset/images/icons/clone-solid.svg'}
                             size={20}
                             color={'var(--primary-button-link-text-color, #000)'}/>
            </button>
            <button className={'btn btn-primary'} title="delete"
                    onClick={() => widgetSettings.renderDeleteBtn ? setWidgetSettings({
                        ...widgetSettings,
                        renderDeleteBtn: false
                    }) : setWidgetSettings({
                        ...widgetSettings,
                        renderDeleteBtn: true
                    })}>
                <SvgRenderer svgUrl={'/public/asset/images/icons/trash-can-solid.svg'}
                             size={20}
                             color={'var(--primary-button-link-text-color, #000)'}/>
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
