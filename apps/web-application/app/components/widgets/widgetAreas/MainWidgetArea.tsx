/* eslint-disable */
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';

// @ts-expect-error: component is part of the layout, types are no necessary
const MainWidgetArea = (props) => {
    return (
        <div className={'main-widget-area'}>
            <WidgetsRenderer {...props} />
        </div>
    );
};
export default MainWidgetArea;
