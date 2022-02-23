import {Fragment} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {WidgetPropTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {
    _isEditMode,
    _renderByDayCondition,
    _renderByDevice,
    _renderByLanguageCondition,
} from "@_variables/clientVariables/_widgetsRendererVariables";
const DynamicNoSSR = dynamic(() => import('./DynamicNoSSR'))
const Widget = dynamic(() => import('../Widget/Widget'))

interface WidgetsRendererProps {
    position: string,
    _id?: string,
}

const WidgetsRenderer = ({_id, position}: WidgetsRendererProps) => {

    const {locale} = useRouter()

    const widgetsRendererData = useSelector((store: StoreTypes) => {
        return {
            widgets: store?.widgets?.widgetInGroups?.[position],
            userRole: store?.user.userData?.role,
            isMobile: store.settings?.isMobile,
        }
    })

    const renderWidgets = widgetsRendererData?.widgets?.sort((a, b) => a.data.widgetIndex > b.data.widgetIndex ? 1 : -1)
        ?.map((widget: WidgetPropTypes) => {
// if (widget.data.type === 'posts'){
//     console.log(widget.data.uniqueData)
// }
            if (
                _renderByLanguageCondition(locale, widget.data.languageToRender) &&
                _renderByDayCondition(widget.data?.specificDayToRender) &&
                _renderByDevice(widgetsRendererData.isMobile, widget.data.deviceTypeToRender) &&
                !_isEditMode(widget.data.editMode, widgetsRendererData.userRole)
            ) {
                const WidgetFragment = widget.data.noSSR ? DynamicNoSSR : Fragment
                return (
                    <WidgetFragment key={widget._id}>
                        <Widget
                            key={widget._id}
                            widgetId={widget._id}
                            isSidebar={position ? position.includes('Sidebar') : false}
                            viewType={widget.data?.viewType}
                            {...widget}
                        />
                    </WidgetFragment>
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

// const Posts = dynamic(() => import('../Posts/Posts'))
// const CategoriesRenderer = dynamic(() =>
// import('../pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer'))
// const TagsRenderer = dynamic(() =>
// import('../pagesComponents/tagsPageComponents/Components/TagsRenderer/TagsRenderer'))
// const ActorsRenderer = dynamic(() =>
// import('../pagesComponents/actorsPageComponents/Components/ActorsRenderer'))
// const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
// const MetaWidget = dynamic(() => import('../widgets/MetaWidget/MetaWidget'))
// const MediaWidget = dynamic(() => import('../widgets/MediaWidget/MediaWidget'))
// const SearchInputComponent = dynamic(() => import('../widgets/SearchInputComponent/SearchInputComponent'))
// const SearchButton = dynamic(() => import('../widgets/SearchButton/SearchButton'))
// const AlphabeticalNumericalRangeLinksWidget = dynamic(() =>
// import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'))
// const LanguagesSwitcher = dynamic(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'))
// const Logo = dynamic(() => import('../widgets/Logo/Logo'))
// const LinkTo = dynamic(() => import('../widgets/LinkTo/LinkTo'))
// const PostsSlider = dynamic(() => import('../widgets/PostsSlider/PostsSlider'))
// const MenuWidget = dynamic(() => import('../widgets/MenuWidget/MenuWidget'))
// const ShoppingCart = dynamic(() => import('../widgets/ShoppingCart/ShoppingCart'))
// const FormWidget = dynamic(() => import('../widgets/FormWidget/FormWidget'))
// const MultipleLinkTo = dynamic(() => import('../widgets/MultipleLinkTo/MultipleLinkTo'))
// const Advertise = dynamic(() => import('../widgets/Advertise/Advertise'))
// const ImageSwiper = dynamic(() => import('../widgets/ImageSwiper/ImageSwiper'), {ssr: false})
// const PostSwiper = dynamic(() => import('../widgets/PostSwiper/PostSwiper'), {ssr: false})
// const Authentication = dynamic(() =>
// import('../widgets/Authentication/Authentication'), {ssr: false})


// const widgetToRender =  widget.data.type === 'posts' ? Posts :
//                         widget.data.type === 'postsSwiper' ? PostSwiper :
//                         widget.data.type === 'postsSlider' ? PostsSlider :
//                         widget.data.type === 'multipleLinkTo' ? MultipleLinkTo :
//                         widget.data.type === 'media' ? MediaWidget :
//                         widget.data.type === 'recentComments' ? RecentComments :
//                         widget.data.type === 'meta' ? MetaWidget :
//                         widget.data.type === 'metaWithImage' && widget.data.metaType === 'categories' ?
//                             CategoriesRenderer :
//                         widget.data.type === 'metaWithImage' && widget.data.metaType === 'tags' ?
//                             TagsRenderer :
//                         widget.data.type === 'metaWithImage' && widget.data.metaType === 'actors' ?
//                             ActorsRenderer :
//                         widget.data.type === 'searchBar' ? SearchInputComponent :
//                         widget.data.type === 'searchButton' ? SearchButton :
//                         widget.data.type === 'logo' ? Logo :
//                         widget.data.type === 'alphabeticalNumericalRange' ?
//                             AlphabeticalNumericalRangeLinksWidget :
//                         widget.data.type === 'language' ? LanguagesSwitcher :
//                         widget.data.type === 'authentication' ? Authentication :
//                         widget.data.type === 'linkTo' ? LinkTo :
//                         widget.data.type === 'imageSwiper' ? ImageSwiper :
//                         widget.data.type === 'menu' ? MenuWidget :
//                         widget.data.type === 'shoppingCart' ? ShoppingCart :
//                         widget.data.type === 'advertise' ? Advertise :
//                         widget.data.type === 'form' ? FormWidget
//                         : null;