import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';

const FooterWidgetArea = (props: any) => {
  return (
    <footer className={'footerWidgetArea'}>
      <div className={'innerContent'}>
        <WidgetsRenderer {...props} position={'footer'} />
      </div>
    </footer>
  );
};

export default FooterWidgetArea;
