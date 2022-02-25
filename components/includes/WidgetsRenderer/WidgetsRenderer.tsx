import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {WidgetPropTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {
    _isEditMode,
    _renderByDayCondition,
    _renderByDevice,
    _renderByLanguageCondition,
} from "@_variables/clientVariables/_widgetsRendererVariables";
const DynamicNoSSR = dynamic(() => import('./DynamicNoSSR'))
const Widget = dynamic(() => import('../Widget/Widget'))

interface WidgetsRendererProps {
    position: string,
    _id?: string,
}

const WidgetsRenderer = ({_id, position}: WidgetsRendererProps) => {

    const {locale} = useRouter()

    const widgetsRendererData = useSelector((store: StoreTypes) => {
        return {
            widgets: store?.widgets?.widgetInGroups?.[position],
            userRole: store?.user.userData?.role,
            isMobile: store.settings?.isMobile,
        }
    })

    // console.log(widgetsRendererData.widgets)

    const renderWidgets = widgetsRendererData?.widgets?.sort((a, b) => a.data.widgetIndex > b.data.widgetIndex ? 1 : -1)
        ?.map((widget: WidgetPropTypes) => {
            if (
                _renderByLanguageCondition(locale, widget.data.languageToRender) &&
                _renderByDayCondition(widget.data?.specificDayToRender) &&
                _renderByDevice(widgetsRendererData.isMobile, widget.data.deviceTypeToRender) &&
                !_isEditMode(widget.data.editMode, widgetsRendererData.userRole)
            ) {
                const widgetProps = {
                    key:widget._id,
                    widgetId:widget._id,
                    isSidebar:position ? position.includes('Sidebar') : false,
                    viewType:widget.data?.viewType,
                    ...widget
                }

              return widget.data.noSSR ?
                    <DynamicNoSSR>
                        <Widget{...widgetProps}/>
                    </DynamicNoSSR>:
                    <Widget{...widgetProps}/>

            } else return null
        })

    return (
        <>
            {renderWidgets}
        </>
    )
};
export default WidgetsRenderer;

