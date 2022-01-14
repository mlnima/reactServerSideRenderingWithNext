import React, {useState, useEffect, useMemo} from 'react';
import Widget from '../Widget/Widget'
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

const Posts = dynamic(() => import('../Posts/Posts'))
const CategoriesRenderer = dynamic(() => import('../pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer'))
const TagsRenderer = dynamic(() => import('../pagesComponents/tagsPageComponents/Components/TagsRenderer/TagsRenderer'))
const ActorsRenderer = dynamic(() => import('../pagesComponents/actorsPageComponents/Components/ActorsRenderer/ActorsRenderer'))
const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
const MetaWidget = dynamic(() => import('../widgets/MetaWidget/MetaWidget'))
const MediaWidget = dynamic(() => import('../widgets/MediaWidget/MediaWidget'))
const SearchInputComponent = dynamic(() => import('../widgets/SearchInputComponent/SearchInputComponent'))
const SearchButton = dynamic(() => import('../widgets/SearchButton/SearchButton'))
const AlphabeticalNumericalRangeLinksWidget = dynamic(() => import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'))
const LanguagesSwitcher = dynamic(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'))
const Logo = dynamic(() => import('../widgets/Logo/Logo'))
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'), {ssr: false})
const LinkTo = dynamic(() => import('../widgets/LinkTo/LinkTo'))
const ImageSwiper = dynamic(() => import('../widgets/ImageSwiper/ImageSwiper'), {ssr: false})
const PostSwiper = dynamic(() => import('../widgets/PostSwiper/PostSwiper'), {ssr: false})
const PostsSlider = dynamic(() => import('../widgets/PostsSlider/PostsSlider'))
const MenuWidget = dynamic(() => import('../widgets/MenuWidget/MenuWidget'))
const ShoppingCart = dynamic(() => import('../widgets/ShoppingCart/ShoppingCart'))
const FormWidget = dynamic(() => import('../widgets/FormWidget/FormWidget'))
const MultipleLinkTo = dynamic(() => import('../widgets/MultipleLinkTo/MultipleLinkTo'))

interface WidgetsRendererProps {
    position: string,
    _id?: string,
    isSidebar?: boolean,
    rendering?: boolean
}

const WidgetsRenderer = ({_id, position, isSidebar}: WidgetsRendererProps) => {

    const widgets = useSelector((store: StoreTypes) => store.widgets.widgets)
    const settings = useSelector((store: StoreTypes) => store.settings);
    const userData = useSelector((store: StoreTypes) => store?.user.userData)
    const router = useRouter()
    const today = new Date().toLocaleString('en-us', {weekday: 'long'}).toLowerCase()

    const widgetsMemo = useMemo(()=>{
        return widgets.filter((widget) => widget.data?.position === position).sort((a: WidgetPropTypes, b: WidgetPropTypes) => {
            return a.data.widgetIndex > b.data.widgetIndex ? 1 : -1
        })
    },[widgets,isSidebar,router.pathname])

    const renderWidgets = widgetsMemo?.map((widget: any, index: number) => {
        const languageToRender = widget.data.languageToRender || 'all';
        const activeLanguage = router.locale;
        const renderByLanguageCondition = languageToRender === activeLanguage || !languageToRender || languageToRender === 'all' || (languageToRender === 'default' && activeLanguage === process.env.NEXT_PUBLIC_DEFAULT_LOCAL);
        const renderByDayCondition = widget.data?.specificDayToRender === today || widget.data?.specificDayToRender === 'all' || !widget.data?.specificDayToRender;


        const isEditMode = widget.data.editMode && userData?.role !== 'administrator';

        const widgetToRender = widget.data.type === 'posts' ? Posts :
            widget.data.type === 'postsSwiper' ? PostSwiper :
                widget.data.type === 'postsSlider' ? PostsSlider :
                    widget.data.type === 'multipleLinkTo' ? MultipleLinkTo :
                        widget.data.type === 'media' ? MediaWidget :
                            widget.data.type === 'recentComments' ? RecentComments :
                                widget.data.type === 'meta' ? MetaWidget :
                                    widget.data.type === 'metaWithImage' && widget.data.metaType === 'categories' ? CategoriesRenderer :
                                        widget.data.type === 'metaWithImage' && widget.data.metaType === 'tags' ? TagsRenderer :
                                            widget.data.type === 'metaWithImage' && widget.data.metaType === 'actors' ? ActorsRenderer :
                                                widget.data.type === 'searchBar' ? SearchInputComponent :
                                                    widget.data.type === 'searchButton' ? SearchButton :
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

        if (renderByLanguageCondition && renderByDayCondition && !isEditMode) {

            return (
                <Widget
                    key={index}
                    widgetId={widget._id}
                    isSidebar={position ? position.includes('Sidebar') : false}
                    {...widget}
                    widgetToRender={widgetToRender}
                    postElementSize={settings.design?.postElementSize}
                    viewType={widget.data?.viewType}
                />
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
