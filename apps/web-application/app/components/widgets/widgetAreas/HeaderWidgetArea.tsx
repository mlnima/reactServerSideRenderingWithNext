import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

const HeaderWidgetArea = (props:any) => {
  return (
    <div className={'headerWidgetArea'}>
      <div className={'innerContent'}>
        <WidgetsRenderer {...props} position={'header'} />
      </div>
    </div>
  );
};

export default HeaderWidgetArea;
