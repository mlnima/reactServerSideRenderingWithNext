import {FC} from "react";
import {WidgetData} from "typescript-types";
import dynamic from "next/dynamic";
import './WidgetWrapper.scss'

const WidgetHeader = dynamic(() => import('./WidgetHeader/WidgetHeader'))
const WidgetPagination = dynamic(() => import('./WidgetPagination/WidgetPagination'))
const PostsListEntireByCategories = dynamic(() => import('../widgets/PostsListEntireByCategories/PostsListEntireByCategories'))
// const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
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
const PostsSliderWidget = dynamic(() => import('../widgets/PostsSliderWidget/PostsSliderWidget'))
const PostsListWidget = dynamic(() => import('@components/widgets/widgets/PostsListWidget/PostsListWidget'))
// const ImagesSlider = dynamic(() => import('../widgets/ImagesSlider/ImagesSlider'))
const WidgetText = dynamic(() => import('./WidgetText/WidgetText'))
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'))
const Searchbar = dynamic(() => import('../widgets/Searchbar/Searchbar'))
const MetasCardsWidget = dynamic(() => import('@components/widgets/widgets/MetasCardsWidget/MetasCardsWidget'))
const PostsCardsWidget = dynamic(() => import('@components/widgets/widgets/PostsCardsWidget/PostsCardsWidget'))

interface IProps {
    data: WidgetData,
    widgetId: string,
    locale: string,
    isSidebar?: boolean,
    viewType?: string,
    dictionary: {
        [key: string]: string
    }
}

const WidgetWrapper: FC<IProps> = ({data, widgetId, isSidebar, viewType, locale, dictionary}) => {

    const widgetMatcher = {
        'postsSlider': PostsSliderWidget,
        'postsList': PostsListWidget,
        'postsListEntireByCategories': PostsListEntireByCategories,
        'posts': PostsCardsWidget,
        // 'imagesSlider':ImagesSlider,
        'multipleLinkTo': MultipleLinkTo,
        'media': MediaWidget,
        // 'recentComments':RecentComments,
        'meta': MetaWidget,
        'metaWithImage': MetasCardsWidget,
        'searchbar': Searchbar,
        'logo': Logo,
        'alphabeticalNumericalRange': AlphabeticalNumericalRangeLinksWidget,
        'language': LanguagesSwitcher,
        'authentication': Authentication,
        'linkTo': LinkTo,
        'menu': MenuWidget,
        'shoppingCart': ShoppingCart,
        'advertise': Advertise,
        'form': FormWidget,
        'dayModeNightMode': DayModeNightMode,
    }

    //@ts-ignore
    const WidgetToRender = widgetMatcher?.[data?.type as string] || null

    return (
        <div className={'widget ' + (data?.extraClassName ?? '')} id={data?.extraId || undefined}>
            {(data?.title || data?.translations?.[locale]?.title) &&
                <WidgetHeader title={data?.translations?.[locale]?.title || data?.title}
                              redirectLink={data?.redirectLink}
                              redirectToTitle={data?.translations?.[locale]?.redirectToTitle || data?.redirectToTitle}/>
            }
            {data?.text && <WidgetText translations={data?.translations} text={data?.text} locale={locale}/>}

            {!!WidgetToRender &&
                <WidgetToRender
                    {...data}
                    dictionary={dictionary}
                    locale={locale}
                    isSidebar={isSidebar}
                    widgetId={widgetId}
                    viewType={viewType}/>
            }

            {(!!data?.pagination && !!data?.redirectLink) &&
                <WidgetPagination baseUrl={data?.redirectLink}
                                  totalCount={data?.uniqueData?.totalCount}
                                  count={data?.count}/>

            }

        </div>
    )
};
export default WidgetWrapper
