import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";

import {
    _isEditMode,
    _renderByDayCondition,
    _renderByDevice,
    _renderByLanguageCondition,
} from "@_variables/clientVariables/_widgetsRendererVariables";
// import {useMemo} from "react";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const DynamicNoSSR = dynamic(() => import('./DynamicNoSSR'))
const Widget = dynamic(() => import('../Widget/WidgetWrapper'))

interface WidgetsRendererProps {
    position: string,
    _id?: string,
}

const WidgetsRenderer = ({_id, position}: WidgetsRendererProps) => {

    const {locale} = useRouter()

    const {widgets, userRole} = useSelector(({widgets, user}: Store) => {
        return {
            widgets: widgets?.widgetInGroups?.[position] || [],
            userRole: user?.userData?.role,
        }
    })

    // const isMobileDevice = useSelector((store: Store) => store.settings?.isMobile)
    // const isMobile = useMemo(() => isMobileDevice, [])
    const isMobile = true

    const renderWidgets = !!widgets?.length && [...widgets].sort((a, b) => a.data.widgetIndex > b.data.widgetIndex ? 1 : -1)
        .map((widget) => {
            if (
                _renderByLanguageCondition(locale, widget?.data?.languageToRender) &&
                _renderByDayCondition(widget.data?.specificDayToRender) &&
                _renderByDevice(isMobile, widget?.data?.deviceTypeToRender) &&
                !_isEditMode(widget.data.editMode, userRole)
            ) {
                const widgetProps = {
                    key: widget._id,
                    widgetId: widget._id,
                    isSidebar: position ? position.includes('Sidebar') : false,
                    viewType: widget.data?.viewType,
                    ...widget
                }

                return widget.data.noSSR ?
                    <DynamicNoSSR key={widget._id}>
                        <Widget{...widgetProps}/>
                    </DynamicNoSSR> :
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

