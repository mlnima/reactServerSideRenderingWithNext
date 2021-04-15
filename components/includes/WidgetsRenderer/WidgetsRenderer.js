import React, {useCallback, useMemo,useContext} from 'react';
import dynamic from 'next/dynamic'
import Widget from '../Widget/Widget'
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
const Posts = dynamic(() => import('../Posts/Posts'))
const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
const MetaWidget = dynamic(() => import('../widgets/MetaWidget/MetaWidget'))
const MediaWidget = dynamic(() => import('../widgets/MediaWidget/MediaWidget'))
const SearchInputComponent = dynamic(() => import('../widgets/SearchInputComponent/SearchInputComponent'))
const AlphabeticalNumericalRangeLinksWidget = dynamic(() => import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'))
const LanguagesSwitcher = dynamic(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'),{ ssr: false })
const Logo = dynamic(() => import('../widgets/Logo/Logo'))
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'))
const LinkTo = dynamic(() => import('../widgets/LinkTo/LinkTo'))
const ImageSwiper = dynamic(() => import('../widgets/ImageSwiper/ImageSwiper'),{ ssr: false })
const PostSwiper = dynamic(() => import('../widgets/PostSwiper/PostSwiper'),{ ssr: false })
const MenuWidget = dynamic(() => import('../widgets/MenuWidget/MenuWidget'))
const ShoppingCart = dynamic(() => import('../widgets/ShoppingCart/ShoppingCart'))
const FormWidget = dynamic(() => import('../widgets/FormWidget/FormWidget'))
const MultipleLinkTo = dynamic(() => import('../widgets/MultipleLinkTo/MultipleLinkTo'))


const WidgetsRenderer =  props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const widgets = useMemo(()=>{
       return  props.widgets?.sort((a,b)=>(a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
    },[props.widgets])


    const renderWidgets = widgets?.map(widget => {
        const targetComponent =
            widget.data.type === 'posts' ? Posts :
            widget.data.type === 'multipleLinkTo' ? MultipleLinkTo :
            widget.data.type === 'media' ? MediaWidget :
            widget.data.type === 'text' ? null :
            widget.data.type === 'textEditor' ? null :
            widget.data.type === 'recentComments' ? RecentComments :
            widget.data.type === 'meta' ? MetaWidget :
            widget.data.type === 'searchBar' ? SearchInputComponent :
            widget.data.type === 'logo' ? Logo :
            widget.data.type === 'alphabeticalNumericalRange' ? AlphabeticalNumericalRangeLinksWidget :
            widget.data.type === 'language' ? LanguagesSwitcher :
            widget.data.type === 'authentication' ? Authentication :
            widget.data.type === 'linkTo' ? LinkTo :
            widget.data.type === 'imageSwiper' ? ImageSwiper :
            widget.data.type === 'postsSwiper' ? PostSwiper :
            widget.data.type === 'menu' ? MenuWidget :
            widget.data.type === 'shoppingCart' ? ShoppingCart :
            widget.data.type === 'form' ? FormWidget : null

        // const conditionalWidgetRenderer = useCallback( (deviceType, languageToRender, activeLanguage) => {
        //     if ((!deviceType && !languageToRender) || (deviceType === 'all' || languageToRender === 'all')) {
        //         return true
        //     } else if ((deviceType === 'mobile' && props.isMobile && (languageToRender === activeLanguage || languageToRender === 'all' || !languageToRender))) {
        //         return true
        //     } else if ((deviceType === 'desktop' && !props.isMobile && (languageToRender === activeLanguage || languageToRender === 'all' || !languageToRender))) {
        //         return true
        //     } else if ((!deviceType && languageToRender && (languageToRender === activeLanguage || languageToRender === 'all'))) {
        //         return true
        //     } else return false
        // },[])

        const deviceType = widget.data.deviceTypeToRender;
        const languageToRender = widget.data.languageToRender;
        const activeLanguage = router.locale ?? contextData?.state?.activeLanguage;

        const conditionalWidgetRenderer = (!deviceType && !languageToRender) || (deviceType === 'all' || languageToRender === 'all') ? true :
            (deviceType === 'mobile' && props.isMobile && (languageToRender === activeLanguage || languageToRender === 'all' || !languageToRender))?true:
                (deviceType === 'desktop' && !props.isMobile && (languageToRender === activeLanguage || languageToRender === 'all' || !languageToRender))

       if (conditionalWidgetRenderer){
           return(
               <Widget currentPageSidebar={props.currentPageSidebar}
                       isMobile={props.isMobile}
                       key={ props.widgets.indexOf(widget) }
                       propsKey={ widget._id }
                       component={ targetComponent }
                       { ...widget }
                       postElementSize={props.postElementSize}
                       referer={props.referer} />
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
