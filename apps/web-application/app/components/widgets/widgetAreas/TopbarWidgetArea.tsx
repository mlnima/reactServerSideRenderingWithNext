import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

// @ts-expect-error: component is part of the layout, types are no necessary
const TopbarWidgetArea = props => {
    return (
        <div className={'topbar-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer {...props} position={'navigation'} />
            </div>
        </div>
    );
};

export default TopbarWidgetArea;
