import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

const NavigationWidgetArea = props => {
    return (
        <nav className={'navigation-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer {...props} position={'navigation'} />
            </div>
        </nav>
    );
};

export default NavigationWidgetArea;
