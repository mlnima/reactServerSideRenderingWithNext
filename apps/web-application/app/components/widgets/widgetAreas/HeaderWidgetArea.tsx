import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

// @ts-expect-error: component is part of the layout, types are no necessary
const HeaderWidgetArea = props => {
    return (
        <div className={'header-widget-area'}>
            <div className={'innerContent'}>
                <WidgetsRenderer {...props} position={'header'} />
            </div>
        </div>
    );
};
export default HeaderWidgetArea;
