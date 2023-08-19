import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";

interface IProps {
    widgets: Widget[],
    locale: string,
    dictionary: {
        [key: string]: string
    }
    position: string
}

const MainWidgetArea: FC<IProps> = ({widgets, locale, position,dictionary}) => {
    return (
        <div className={'main-widget-area'}>
            <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets} position={position}/>
        </div>
    )
};
export default MainWidgetArea
