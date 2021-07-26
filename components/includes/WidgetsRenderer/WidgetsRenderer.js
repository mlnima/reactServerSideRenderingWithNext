import React, {useMemo, useContext} from 'react';
import Widget from '../Widget/Widget'
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
import dynamic from "next/dynamic";
const Posts = dynamic(() => import('../Posts/Posts'))
const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
const MetaWidget = dynamic(() => import('../widgets/MetaWidget/MetaWidget'))
const MediaWidget = dynamic(() => import('../widgets/MediaWidget/MediaWidget'))
const SearchInputComponent = dynamic(() => import('../widgets/SearchInputComponent/SearchInputComponent'))
const AlphabeticalNumericalRangeLinksWidget = dynamic(() => import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'))
const LanguagesSwitcher = dynamic(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'))
const Logo = dynamic(() => import('../widgets/Logo/Logo'))
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'))
const LinkTo = dynamic(() => import('../widgets/LinkTo/LinkTo'))
const ImageSwiper = dynamic(() => import('../widgets/ImageSwiper/ImageSwiper'), {ssr: false})
const PostSwiper = dynamic(() => import('../widgets/PostSwiper/PostSwiper'), {ssr: false})
const MenuWidget = dynamic(() => import('../widgets/MenuWidget/MenuWidget'))
const ShoppingCart = dynamic(() => import('../widgets/ShoppingCart/ShoppingCart'))
const FormWidget = dynamic(() => import('../widgets/FormWidget/FormWidget'))
const MultipleLinkTo = dynamic(() => import('../widgets/MultipleLinkTo/MultipleLinkTo'))

const WidgetsRenderer = ({postElementStyle, postElementSize, widgets, isMobile, currentPageSidebar, referer, _id, postElementImageLoader, postElementImageLoaderType}) => {

    const contextData = useContext(AppContext);
    const router = useRouter()
    const widgetsMemo = useMemo(() => {
        return widgets?.sort((a, b) => (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
    }, [widgets])

    const renderWidgets = widgetsMemo?.map(widget => {

        const deviceType = widget.data.deviceTypeToRender || 'all';
        const languageToRender = widget.data.languageToRender || 'all';
        const activeLanguage = router.locale ?? contextData?.state?.activeLanguage;

        const renderByLanguageCondition = languageToRender === activeLanguage || !languageToRender || languageToRender === 'all' || (languageToRender === 'default' && activeLanguage === process.env.REACT_APP_DEFAULT_LOCAL );
        const renderByDeviceTypeCondition = !deviceType || (deviceType === 'mobile' && isMobile) || (deviceType === 'desktop' && !isMobile) || deviceType === 'all';
       const isEditMode = widget.data.editMode && contextData?.userData?.role !== 'administrator'
        //const isEditMode = widget.data.editMode


        const widgetToRender = widget.data.type === 'posts' ? Posts :
            widget.data.type === 'postsSwiper' ? PostSwiper :
                widget.data.type === 'multipleLinkTo' ? MultipleLinkTo :
                    widget.data.type === 'media' ? MediaWidget :
                        widget.data.type === 'recentComments' ? RecentComments :
                            widget.data.type === 'meta' ? MetaWidget :
                                widget.data.type === 'searchBar' ? SearchInputComponent :
                                    widget.data.type === 'logo' ? Logo :
                                        widget.data.type === 'alphabeticalNumericalRange' ? AlphabeticalNumericalRangeLinksWidget :
                                            widget.data.type === 'language' ? LanguagesSwitcher :
                                                widget.data.type === 'authentication' ? Authentication :
                                                    widget.data.type === 'linkTo' ? LinkTo :
                                                        widget.data.type === 'imageSwiper' ? ImageSwiper :
                                                            widget.data.type === 'menu' ? MenuWidget :
                                                                widget.data.type === 'shoppingCart' ? ShoppingCart :
                                                                    widget.data.type === 'form' ? FormWidget
                                                                        : null;

        if (renderByDeviceTypeCondition && renderByLanguageCondition && !isEditMode) {
            return (
                <Widget currentPageSidebar={currentPageSidebar}
                        isMobile={isMobile}
                        key={widgets.indexOf(widget)}
                        widgetId = {widget._id}
                        {...widget}
                        widgetToRender={widgetToRender}
                        postElementSize={postElementSize}
                        postElementStyle={postElementStyle}
                        postElementImageLoader={postElementImageLoader}
                        postElementImageLoaderType={postElementImageLoaderType}
                        viewType={widget.data?.viewType}
                        referer={referer}/>
            )

        } else return null
    })

    return (
        <>
            {renderWidgets}
        </>
    )
};
export default WidgetsRenderer;
