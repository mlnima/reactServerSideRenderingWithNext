import { FC } from 'react';
import { Widget } from 'typescript-types';
import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

interface IProps {
    widgets: Widget[];
    locale: string;
    dictionary: {
        [key: string]: string;
    };
    postSettings: {
        [key: string]: string;
    };
}

const NavigationWidgetArea: FC<IProps> = ({ widgets, locale, dictionary,postSettings }) => {
    return (
        <nav className={'navigation-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer
                    postSettings={postSettings}
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgets}
                    position={'navigation'}
                />
            </div>
        </nav>
    );
};

export default NavigationWidgetArea;
