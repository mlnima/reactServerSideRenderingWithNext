import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "../widgetRenderer/WidgetsRenderer";

interface IProps {
    widgets:Widget[],
    locale:string
}

const FooterWidgetArea: FC<IProps> = ({widgets,locale}) => {
    return (
        <footer className={'widget-area footer bg-tertiary-background-color text-primary-text-Color w-full'}>
            <div className={'footer-content flex justify-between items-center p-2 box-border w-full h-full'}>
                <WidgetsRenderer locale={locale} widgets={widgets} position={'footer'}/>
            </div>
        </footer>
    )
};
export default FooterWidgetArea
