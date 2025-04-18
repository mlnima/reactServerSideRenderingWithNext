import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

const HeaderWidgetArea = (props:any) => {
  return (
    <div className={'header-widget-area'}>
      <div className={'innerContent'}>
        <WidgetsRenderer {...props} position={'header'} />
      </div>
    </div>
  );
};

export default HeaderWidgetArea;
