import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

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
