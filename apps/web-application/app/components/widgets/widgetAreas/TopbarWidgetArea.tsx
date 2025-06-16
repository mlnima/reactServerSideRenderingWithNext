import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';


const TopbarWidgetArea = (props: any) => {
  return (
    <div className={'widgetArea topbarWidgetArea'}>
      <div className={'innerContent'}>
        <WidgetsRenderer {...props} position={'navigation'} />
      </div>
    </div>
  );
};

export default TopbarWidgetArea;
