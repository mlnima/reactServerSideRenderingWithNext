import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

// @ts-expect-error: component is part of the layout, types are no necessary
const FooterWidgetArea = props => {
    return (
        <footer className={'footer-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer {...props} position={'footer'} />
            </div>
        </footer>
    );
};

export default FooterWidgetArea;
