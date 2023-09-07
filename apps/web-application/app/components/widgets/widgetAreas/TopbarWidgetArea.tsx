import {FC} from "react";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import WidgetsRenderer from "../widgetRenderer/WidgetsRenderer";
import './widgetAreas.styles.scss';

interface IProps {
    widgets:Widget[],
    locale:string,
    dictionary: {
        [key: string]: string
    }
}

const TopbarWidgetArea: FC<IProps> = ({widgets,locale,dictionary}) => {
    return (
        <div className={'topbar-widget-area'}>
            <div className={'inner-content'}>
                <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets} position={'navigation'}/>
            </div>
        </div>
    )
};

export default TopbarWidgetArea
