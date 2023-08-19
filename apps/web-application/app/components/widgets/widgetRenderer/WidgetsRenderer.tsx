import {FC} from "react";
import {Widget} from "typescript-types";
import {renderByDayCondition, renderByDevice, renderByLanguageCondition} from "custom-util";
import dynamic from "next/dynamic";
const WidgetWrapper = dynamic(() => import("../widgetWrapper/WidgetWrapper"))

interface IProps {
    locale:string,
    widgets:Widget[],
    position:string,
    hasSidebar?: string,
    dictionary: {
        [key: string]: string
    }
}

const WidgetsRenderer: FC<IProps> = ({widgets,locale,position,dictionary,hasSidebar}) => {

    const renderWidget = [...(widgets || [])]
        ?.sort((a, b) => a?.data?.widgetIndex > b?.data?.widgetIndex ? 1 : -1)
        ?.map((widget) => {
            if (
                renderByLanguageCondition(locale,widget?.data?.languageToRender) &&
                renderByDayCondition(widget.data?.specificDayToRender) &&
                renderByDevice(true , widget?.data?.deviceTypeToRender)
            ){
                const widgetProps = {
                    dictionary,
                    locale,
                    hasSidebar,
                    widgetId: widget._id,
                    isSidebar: position ? position.includes('Sidebar') : false,
                    // viewType: widget.data?.viewType,
                    ...widget
                }
                return <WidgetWrapper  {...widgetProps} key={widget._id}/>
            }else return null
        })

    return (
        <>
            {renderWidget}
        </>
    )
};
export default WidgetsRenderer
