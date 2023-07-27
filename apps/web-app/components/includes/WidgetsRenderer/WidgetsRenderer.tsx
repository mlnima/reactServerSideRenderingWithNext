import {memo, useMemo} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {renderByLanguageCondition,renderByDayCondition,renderByDevice,isEditMode} from "custom-util";
import {useAppSelector} from "@store_toolkit/hooks";

const DynamicNoSSR = dynamic(() => import('./DynamicNoSSR'));
const WidgetWrapper = dynamic(() => import('../Widget/WidgetWrapper'));

interface WidgetsRendererProps {
    position: string,
    _id?: string,
}

const WidgetsRenderer = ({_id, position}: WidgetsRendererProps) => {

    const {locale} = useRouter()
    const widgets = useAppSelector(({widgets}) => widgets?.widgetInGroups?.[position] || [])
    const userRole = useAppSelector(({user}) => user?.userData?.role)

    const sortedWidgets = useMemo(()=>{
        return [...widgets]?.sort((a, b) => a?.data?.widgetIndex > b?.data?.widgetIndex ? 1 : -1)
    },[widgets])

    const isMobile = true

    const renderWidgets = sortedWidgets.map((widget) => {
            if (
                renderByLanguageCondition(locale as string, widget?.data?.languageToRender) &&
                renderByDayCondition(widget.data?.specificDayToRender) &&
                renderByDevice(isMobile, widget?.data?.deviceTypeToRender) &&
                //@ts-ignore
                !isEditMode(widget.data?.editMode, userRole)
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

