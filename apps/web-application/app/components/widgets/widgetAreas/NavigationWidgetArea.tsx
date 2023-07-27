import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "../widgetRenderer/WidgetsRenderer";

interface IProps {
    widgets:Widget[],
    locale:string
}

const NavigationWidgetArea: FC<IProps> = ({widgets,locale}) => {
    return (
        <nav className={'widget-area navigation bg-secondary-background-color text-primary-text-Color h-14 w-full'}>
            <div className={'navigation-content flex justify-between items-center p-2 box-border w-full h-full'}>
                <WidgetsRenderer locale={locale} widgets={widgets} position={'navigation'}/>
            </div>
        </nav>
    )
};

export default NavigationWidgetArea
