import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';


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
