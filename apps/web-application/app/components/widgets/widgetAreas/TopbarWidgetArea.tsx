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

const TopbarWidgetArea: FC<IProps> = ({ widgets, locale, dictionary,postSettings }) => {
    return (
        <div className={'topbar-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer
                    postSettings={postSettings}
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgets}
                    position={'navigation'}
                />
            </div>
        </div>
    );
};

export default TopbarWidgetArea;
