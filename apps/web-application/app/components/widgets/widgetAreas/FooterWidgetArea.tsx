import { FC } from 'react';
import { Widget } from 'typescript-types';
import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

interface IProps {
    widgets: Widget[];
    locale: string;
    dictionary: {
        [key: string]: string;
    },
    postSettings: {
        [key: string]: string
    }
}

const FooterWidgetArea: FC<IProps> = ({ widgets, locale, dictionary,postSettings }) => {
    return (
        <footer className={'footer-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer
                    dictionary={dictionary}
                    postSettings={postSettings}
                    locale={locale}
                    widgets={widgets}
                    position={'footer'}
                />
            </div>
        </footer>
    );
};

export default FooterWidgetArea;
