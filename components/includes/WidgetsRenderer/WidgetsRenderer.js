import React, {useEffect,useMemo} from 'react';
import dynamic from 'next/dynamic'
import Widget from '../Widget/Widget'

// const Widget = dynamic(() => import('../Widget/Widget'))

const Posts = dynamic(() => import('../Posts/Posts'))
//import Posts from '../Posts/Posts'
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

const WidgetsRenderer =  props => {
    // const renderWidgets = (props.widgets?.sort((a,b)=>(a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1))?.map(widget => {
    //     const targetComponent =
    //         widget.data.type === 'posts' ? Posts :
    //         widget.data.type === 'media' ? MediaWidget :
    //         widget.data.type === 'text' ? null :
    //         widget.data.type === 'textEditor' ? null :
    //         widget.data.type === 'recentComments' ? RecentComments :
    //         widget.data.type === 'meta' ? MetaWidget :
    //         widget.data.type === 'searchBar' ? SearchInputComponent :
    //         widget.data.type === 'logo' ? Logo :
    //         widget.data.type === 'alphabeticalNumericalRange' ? AlphabeticalNumericalRangeLinksWidget :
    //         widget.data.type === 'language' ? LanguagesSwitcher :
    //         widget.data.type === 'authentication' ? Authentication :
    //         widget.data.type === 'linkTo' ? LinkTo :
    //         widget.data.type === 'imageSwiper' ? ImageSwiper :
    //         widget.data.type === 'postsSwiper' ? PostSwiper :
    //         // widget.data.type === 'postsSwiper' ? null :
    //         widget.data.type === 'menu' ? MenuWidget :
    //         widget.data.type === 'shoppingCart' ? ShoppingCart :
    //         widget.data.type === 'form' ? FormWidget : null
    //
    //     return (
    //         <Widget currentPageSidebar={props.currentPageSidebar} isMobile={props.isMobile} key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ targetComponent } { ...widget } postElementSize={props.postElementSize} />
    //     )
    //
    // })

    const renderWidgets = useMemo(()=>{
       return (props.widgets?.sort((a,b)=>(a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1))?.map(widget => {
            const targetComponent =
                widget.data.type === 'posts' ? Posts :
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
                                                                        // widget.data.type === 'postsSwiper' ? null :
                                                                        widget.data.type === 'menu' ? MenuWidget :
                                                                            widget.data.type === 'shoppingCart' ? ShoppingCart :
                                                                                widget.data.type === 'form' ? FormWidget : null

            return (
                <Widget currentPageSidebar={props.currentPageSidebar} isMobile={props.isMobile} key={ props.widgets.indexOf(widget) } propsKey={ widget._id } component={ targetComponent } { ...widget } postElementSize={props.postElementSize} />
            )

        })
    },[])



    return (
        <>
            { renderWidgets }
        </>
    )
};
export default WidgetsRenderer;
