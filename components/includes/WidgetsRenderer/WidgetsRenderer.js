import {useMemo,useContext} from 'react';
import Widget from '../Widget/Widget'
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";

const WidgetsRenderer =  ({postElementStyle,postElementSize,widgets,isMobile,currentPageSidebar,referer}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const widgetsMemo = useMemo(()=>{
       return  widgets?.sort((a,b)=>(a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
    },[widgets])

    const renderWidgets = widgetsMemo?.map(widget => {
        const deviceType = widget.data.deviceTypeToRender;
        const languageToRender = widget.data.languageToRender;
        const activeLanguage = router.locale ?? contextData?.state?.activeLanguage;
        const conditionalWidgetRenderer = (!deviceType && !languageToRender) || (deviceType === 'all' || languageToRender === 'all') ? true :
            (deviceType === 'mobile' && isMobile && (languageToRender === activeLanguage || languageToRender === 'all' || !languageToRender))?true:
                (deviceType === 'desktop' && !isMobile && (languageToRender === activeLanguage || languageToRender === 'all' || !languageToRender))

       if (conditionalWidgetRenderer){
           return(
               <Widget currentPageSidebar={currentPageSidebar}
                       isMobile={isMobile}
                       key={ widgets.indexOf(widget) }
                       propsKey={ widget._id }
                       { ...widget }
                       postElementSize={postElementSize}
                       postElementStyle={postElementStyle}
                       viewType={widget.data.viewType}
                       referer={referer} />
           )

       }else return null
    })

    return (
       <>
            {renderWidgets}
       </>
    )
};
export default WidgetsRenderer;
