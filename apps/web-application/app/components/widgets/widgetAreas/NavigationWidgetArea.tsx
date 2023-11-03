import {FC} from "react";
import {Widget} from "typescript-types";
import WidgetsRenderer from "../widgetRenderer/WidgetsRenderer";

interface IProps {
    widgets:Widget[],
    locale:string,
    dictionary: {
        [key: string]: string
    }
}

const NavigationWidgetArea: FC<IProps> = ({widgets,locale,dictionary}) => {

    return (
        <nav className={'navigation-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets} position={'navigation'}/>
            </div>
        </nav>
    )
};

export default NavigationWidgetArea
