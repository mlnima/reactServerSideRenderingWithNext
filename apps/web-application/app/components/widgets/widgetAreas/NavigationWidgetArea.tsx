import WidgetsRenderer from '../widgetRenderer/WidgetsRenderer';


const NavigationWidgetArea = (props:any) => {
    return (
        <nav className={'navigationWidgetArea'}>
            <div className={'innerContent'}>
                <WidgetsRenderer {...props} position={'navigation'} />
            </div>
        </nav>
    );
};

export default NavigationWidgetArea;
