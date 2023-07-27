import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "../widgetRenderer/WidgetsRenderer";

interface IProps {
    widgets:Widget[],
    locale:string
}

const TopbarWidgetArea: FC<IProps> = ({widgets,locale}) => {
    return (
        <div className={'widget-area topbar bg-secondary-background-color text-primary-text-Color h-14 w-full'}>
            <div className={'top-bar-content flex justify-between items-center p-2 box-border w-full h-full'}>
                <WidgetsRenderer locale={locale} widgets={widgets} position={'navigation'}/>
            </div>
        </div>
    )
};

export default TopbarWidgetArea
