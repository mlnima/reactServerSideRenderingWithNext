import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";

interface IProps {
    widgets:Widget[],
    locale:string,
    position:string
}

const MainWidgetArea: FC<IProps> = ({widgets,locale,position}) =>  {
    return (
        <div className={'widget-area main bg-primary-background-color text-primary-text-Color w-full'}>
             <WidgetsRenderer locale={locale} widgets={widgets} position={position}/>
        </div>
    )
};
export default MainWidgetArea
