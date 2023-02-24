import {useMemo,memo} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {
    _isEditMode,
    _renderByDayCondition,
    _renderByDevice,
    _renderByLanguageCondition,
} from "@_variables/_clientVariables/clientVariables/_widgetsRendererVariables";


const DynamicNoSSR = dynamic(() => import('./DynamicNoSSR'));
const WidgetWrapper = dynamic(() => import('../Widget/WidgetWrapper'));

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

    const isMobile = true

    const sortWidgetsByIndex = useMemo(()=> {
        return [...widgets]?.sort((a, b) => a?.data?.widgetIndex > b?.data?.widgetIndex ? 1 : -1);
    },[widgets])

    const renderWidgets = sortWidgetsByIndex.map((widget) => {
            if (
                _renderByLanguageCondition(locale as string, widget?.data?.languageToRender) &&
                _renderByDayCondition(widget.data?.specificDayToRender) &&
                _renderByDevice(isMobile, widget?.data?.deviceTypeToRender) &&
                //@ts-ignore
                !_isEditMode(widget.data.editMode, userRole)
            ) {
                const widgetProps = {

                    widgetId: widget._id,
                    isSidebar: position ? position.includes('Sidebar') : false,
                    viewType: widget.data?.viewType,
                    ...widget
                }

                return widget.data.noSSR ?
                    <DynamicNoSSR key={widget._id} >
                        <WidgetWrapper{...widgetProps}/>
                    </DynamicNoSSR> :
                    <WidgetWrapper{...widgetProps} key={widget._id}/>
            } else return null
        })


    return (
        < >
            {renderWidgets}
        </>
    )
};
export default memo(WidgetsRenderer);

