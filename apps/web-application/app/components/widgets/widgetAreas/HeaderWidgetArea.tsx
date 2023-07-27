import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "../widgetRenderer/WidgetsRenderer";

interface IProps {
    widgets:Widget[],
    locale:string
}

const HeaderWidgetArea: FC<IProps> = ({widgets,locale}) => {
    return (
        <div className={'widget-area header bg-tertiary-background-color text-primary-text-Color w-full'}>
            <div className={'header-content flex justify-between items-center p-2 box-border w-full h-full'}>
                <WidgetsRenderer locale={locale} widgets={widgets} position={'header'}/>
            </div>
        </div>
    )
};
export default HeaderWidgetArea