import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "../widgetRenderer/WidgetsRenderer";

interface IProps {
    widgets:Widget[],
    locale:string,
    dictionary: {
        [key: string]: string
    }
}

const HeaderWidgetArea: FC<IProps> = ({widgets,locale,dictionary}) => {
    return (
        <div className={'header-widget-area'}>
            <div className={'inner-content'}>
                <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets} position={'header'}/>
            </div>
        </div>
    )
};
export default HeaderWidgetArea