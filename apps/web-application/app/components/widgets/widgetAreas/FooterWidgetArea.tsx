import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "../widgetRenderer/WidgetsRenderer";
import './widgetAreas.styles.scss'

interface IProps {
    widgets:Widget[],
    locale:string,
    dictionary: {
        [key: string]: string
    }
}

const FooterWidgetArea: FC<IProps> = ({widgets,locale,dictionary}) => {
    return (
        <footer className={'footer-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets} position={'footer'}/>
            </div>
        </footer>
    )
};

export default FooterWidgetArea
