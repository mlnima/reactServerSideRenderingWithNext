import { FC } from 'react';
import { Widget } from 'typescript-types';
import WidgetWrapper from '../widgetWrapper/WidgetWrapper';

interface IProps {
    widgets: Widget[];
    position: string;
    locale: string;
    hasSidebar?: string;
    dictionary: {
        [key: string]: string;
    };
}

const WidgetsRenderer: FC<IProps> = ({ widgets, position, dictionary, hasSidebar, locale }) => {
    const renderWidget = [...(widgets || [])]
        ?.sort((a, b) => (a?.data?.widgetIndex > b?.data?.widgetIndex ? 1 : -1))
        ?.map(widget => {
            const widgetProps = {
                dictionary,
                hasSidebar,
                locale,
                widgetId: widget._id,
                isSidebar: position ? position.includes('Sidebar') : false,
                ...widget,
            };
            return <WidgetWrapper {...widgetProps} key={widget._id} />;
        });

    return <>{renderWidget}</>;
};
export default WidgetsRenderer;

//***************DO NOT DELETE THIS COMMENT****************************

//import {renderByDayCondition, renderByDevice, renderByLanguageCondition} from "@repo/shared-util";

// if (
//     renderByLanguageCondition(locale, widget?.data?.languageToRender) &&
//     renderByDayCondition(widget.data?.specificDayToRender) &&
//
//     renderByDevice(true, widget?.data?.deviceTypeToRender)
// ) {
//     const widgetProps = {
//         dictionary,
//         locale,
//         hasSidebar,
//         widgetId: widget._id,
//         isSidebar: position ? position.includes('Sidebar') : false,
//         // viewType: widget.data?.viewType,
//         ...widget
//     }
//     return <WidgetWrapper  {...widgetProps} key={widget._id}/>
// } else return null
