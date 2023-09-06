import dynamic from "next/dynamic";
import {FC, memo} from "react";
import {WidgetData} from "typescript-types";
const WidgetHeader = dynamic(() => import('./WidgetHeader/WidgetHeader'))
const WidgetCustomScript = dynamic(() => import('./WidgetCustomScript/WidgetCustomScript'))
const WidgetPagination = dynamic(() => import('./WidgetPagination/WidgetPagination'))
const Posts = dynamic(() => import('../cards/CardsRenderer/PostsCardsRenderer'))
const PostsListEntireByCategories = dynamic(() => import('@components/includes/widgets/PostsListEntireByCategories/PostsListEntireByCategories'))
const MetasCardsRenderer = dynamic(() =>
    import('../cards/CardsRenderer/MetasCardsRenderer'))
const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
const MetaWidget = dynamic(() => import('../widgets/MetaWidget/MetaWidget'))
const MediaWidget = dynamic(() => import('../widgets/MediaWidget/MediaWidget'))
const AlphabeticalNumericalRangeLinksWidget = dynamic(() =>
    import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'))
const LanguagesSwitcher = dynamic(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'))
const DayModeNightMode = dynamic(() => import('../widgets/DayModeNightMode/DayModeNightMode'))
const Logo = dynamic(() => import('../widgets/Logo/Logo'))
const LinkTo = dynamic(() => import('../widgets/LinkTo/LinkTo'))
const MenuWidget = dynamic(() => import('../widgets/MenuWidget/MenuWidget'))
const ShoppingCart = dynamic(() => import('../widgets/ShoppingCart/ShoppingCart'))
const FormWidget = dynamic(() => import('../widgets/FormWidget/FormWidget'))
const MultipleLinkTo = dynamic(() => import('../widgets/MultipleLinkTo/MultipleLinkTo'))
const Advertise = dynamic(() => import('../widgets/Advertise/Advertise'))
const PostSlider = dynamic(() => import('../widgets/PostsSlider/PostsSlider'))
const PostsList = dynamic(() => import('../widgets/PostsList/PostsList'))
const ImagesSlider = dynamic(() => import('../widgets/ImagesSlider/ImagesSlider'))
const Text = dynamic(() => import('./WidgetsModelsComponents/Text/Text'))
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'))
const Searchbar = dynamic(() => import('../widgets/Searchbar/Searchbar'))

interface WidgetComponentPropTypes {
    data: WidgetData,
    widgetId: string,
    isSidebar: boolean,
    viewType?: string
}

const WidgetWrapper: FC<WidgetComponentPropTypes> = ({data, widgetId, isSidebar, viewType}) => {

    const widgetMatcher = {
        'postsSlider': PostSlider,
        'postsList': PostsList,
        'postsListEntireByCategories': PostsListEntireByCategories,
        'posts':Posts,
        'imagesSlider':ImagesSlider,
        'multipleLinkTo':MultipleLinkTo,
        'media':MediaWidget,
        'recentComments':RecentComments,
        'meta':MetaWidget,
        'metaWithImage':MetasCardsRenderer,
        'searchBar':Searchbar,
        'searchButton':Searchbar,
        'searchbar':Searchbar,
        'logo':Logo,
        'alphabeticalNumericalRange':AlphabeticalNumericalRangeLinksWidget,
        'language':LanguagesSwitcher,
        'authentication':Authentication,
        'linkTo':LinkTo,
        'menu':MenuWidget,
        'shoppingCart':ShoppingCart,
        'advertise':Advertise,
        'form':FormWidget,
        'dayModeNightMode':DayModeNightMode,
    }

    const WidgetToRender =  widgetMatcher?.[data.type] || null

    return (
        <section className={'widget ' + (data?.extraClassName ?? '')}
                             id={data?.extraId || undefined}>

            {data?.title && <WidgetHeader translations={data?.translations}
                                          title={data?.title}
                                          redirectLink={data?.redirectLink}
                                          redirectToTitle={data?.redirectToTitle}
                                          footerLink={data?.footerLink}/>
            }

            {data?.text && <Text translations={data?.translations} text={data?.text}/>}
            {!!WidgetToRender && <WidgetToRender
                {...data}
                //@ts-ignore
                widgetId={widgetId}
                isSidebar={isSidebar}
                viewType={viewType}/>
            }

            {data?.customScript && <WidgetCustomScript customScript={data?.customScript}
                                                       customScriptStrategy={data?.customScriptStrategy}/>
            }

            {(!!data?.pagination && !!data?.redirectLink) && <WidgetPagination baseUrl={data?.redirectLink}
                                                                               totalCount={data?.uniqueData?.totalCount}
                                                                               count={data?.count}/>
            }
        </section>
    );
};
export default memo(WidgetWrapper);


// const WidgetToRender = useMemo(() => {
//     return data.type === 'postsSlider' ? PostSlider :
//         data.type === 'posts' ? Posts :
//             data.type === 'postsList' ? PostsListWidget :
//                 data.type === 'postsListEntireByCategories' ? PostsListEntireByCategories :
//                     data.type === 'imagesSlider' ? ImagesSlider :
//                         data.type === 'multipleLinkTo' ? MultipleLinkTo :
//                             data.type === 'media' ? MediaWidget :
//                                 data.type === 'recentComments' ? RecentComments :
//                                     data.type === 'meta' ? MetaWidget :
//                                         data.type === 'metaWithImage' ? MetasCardsRenderer :
//                                             data.type === 'searchBar' ? Searchbar :
//                                                 data.type === 'searchButton' ? Searchbar :
//                                                     data.type === 'searchbar' ? Searchbar :
//                                                         data.type === 'logo' ? Logo :
//                                                             data.type === 'alphabeticalNumericalRange' ?
//                                                                 AlphabeticalNumericalRangeLinksWidget :
//                                                                 data.type === 'language' ? LanguagesSwitcher :
//                                                                     data.type === 'authentication' ? Authentication :
//                                                                         data.type === 'linkTo' ? LinkTo :
//                                                                             data.type === 'menu' ? MenuWidget :
//                                                                                 data.type === 'shoppingCart' ? ShoppingCart :
//                                                                                     data.type === 'advertise' ? Advertise :
//                                                                                         data.type === 'form' ? FormWidget :
//                                                                                             data.type === 'dayModeNightMode' ? DayModeNightMode
//                                                                                                 : null;
// }, [])