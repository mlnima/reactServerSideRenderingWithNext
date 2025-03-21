/* eslint-disable */
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';

const MainWidgetArea = (props) => {
  return (
    <div className={'main-widget-area'}>
      <WidgetsRenderer {...props} />
    </div>
  );
};
export default MainWidgetArea;
