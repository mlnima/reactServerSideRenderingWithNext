import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

// @ts-expect-error: component is part of the layout, types are no necessary
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
