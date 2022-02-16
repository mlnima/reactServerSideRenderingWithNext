// import Widget from '../Widget/Widget'
import {Fragment} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";


const DynamicNoSSR = dynamic(() => import('./DynamicNoSSR'))
const Widget = dynamic(() => import('../Widget/Widget'))
const Posts = dynamic(() => import('../Posts/Posts'))
const CategoriesRenderer = dynamic(() => import('../pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer'))
const TagsRenderer = dynamic(() => import('../pagesComponents/tagsPageComponents/Components/TagsRenderer/TagsRenderer'))
const ActorsRenderer = dynamic(() => import('../pagesComponents/actorsPageComponents/Components/ActorsRenderer'))
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
const Advertise = dynamic(() => import('../widgets/Advertise/Advertise'))


interface WidgetsRendererProps {
    position: string,
    _id?: string,
}

const WidgetsRenderer = ({_id, position}: WidgetsRendererProps) => {


    const widgetsMemo = useSelector((store: StoreTypes) => {
        return store.widgets.widgets
            .filter((widget) => widget.data?.position === position)
            .sort((a: WidgetPropTypes, b: WidgetPropTypes) => {
                return a.data.widgetIndex > b.data.widgetIndex ? 1 : -1
            })
    })

    const postElementSize = useSelector((store: StoreTypes) => store.settings?.design?.postElementSize);
    const userRole = useSelector((store: StoreTypes) => store?.user.userData?.role)
    const router = useRouter()
    const today = new Date().toLocaleString('en-us', {weekday: 'long'}).toLowerCase()

    const renderWidgets = widgetsMemo?.map((widget: any, index: number) => {
        const languageToRender = widget.data.languageToRender || 'all';
        const activeLanguage = router.locale;
        const renderByLanguageCondition = languageToRender === activeLanguage ||
            !languageToRender ||
            languageToRender === 'all' ||
            (languageToRender === 'default' && activeLanguage === process.env.NEXT_PUBLIC_DEFAULT_LOCAL);
        const renderByDayCondition = widget.data?.specificDayToRender === today ||
            widget.data?.specificDayToRender === 'all' ||
            !widget.data?.specificDayToRender;
        const isEditMode = widget.data.editMode && userRole !== 'administrator';

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
                                                                                        widget.data.type === 'advertise' ? Advertise :
                                                                                            widget.data.type === 'form' ? FormWidget
                                                                                                : null;

        if (renderByLanguageCondition && renderByDayCondition && !isEditMode) {
            const WidgetFragment = widget.data.noSSR ? DynamicNoSSR : Fragment
            return (
                <WidgetFragment key={widget._id}>
                    <Widget
                        widgetId={widget._id}
                        isSidebar={position ? position.includes('Sidebar') : false}
                        {...widget}
                        WidgetToRender={widgetToRender}
                        postElementSize={postElementSize}
                        viewType={widget.data?.viewType}
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


// const widgets = useSelector((store: StoreTypes) => store.widgets.widgets)
// const widgetsMemo = useMemo(() => {
//     return widgets.filter((widget) => widget.data?.position === position).sort((a: WidgetPropTypes, b: WidgetPropTypes) => {
//         return a.data.widgetIndex > b.data.widgetIndex ? 1 : -1
//     })
// }, [widgets, isSidebar, router.pathname])