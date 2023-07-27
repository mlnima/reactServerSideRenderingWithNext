// "use client"
import {FC} from "react";
import {WidgetData} from "typescript-types";
// import styled from "styled-components";
import dynamic from "next/dynamic";
const WidgetHeader = dynamic(() => import('./WidgetHeader/WidgetHeader'))
const WidgetCustomScript = dynamic(() => import('./WidgetCustomScript'))
const WidgetPagination = dynamic(() => import('./WidgetPagination'))
const PostsCardsRenderer = dynamic(() => import('../../cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer'))
// const PostsListEntireByCategories = dynamic(() => import('@components/includes/widgets/PostsListEntireByCategories/PostsListEntireByCategories'))
const MetasCardsRenderer = dynamic(() => import('../../cards/CardsRenderer/MetasCardsRenderer'))
// const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
const MetaWidget = dynamic(() => import('../widgets/MetaWidget/MetaWidget'))
// const MediaWidget = dynamic(() => import('../widgets/MediaWidget/MediaWidget'))
// const AlphabeticalNumericalRangeLinksWidget = dynamic(() =>
//     import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'))
const LanguagesSwitcher = dynamic(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'))
const DayModeNightMode = dynamic(() => import('../widgets/DayModeNightMode/DayModeNightMode'))
const Logo = dynamic(() => import('../widgets/Logo/Logo'))
const LinkTo = dynamic(() => import('../widgets/LinkTo/LinkTo'))
const MenuWidget = dynamic(() => import('../widgets/MenuWidget/MenuWidget'))
// const ShoppingCart = dynamic(() => import('../widgets/ShoppingCart/ShoppingCart'))
const FormWidget = dynamic(() => import('../widgets/FormWidget/FormWidget'))
// const MultipleLinkTo = dynamic(() => import('../widgets/MultipleLinkTo/MultipleLinkTo'))
const Advertise = dynamic(() => import('../widgets/Advertise/Advertise'))
// const PostSlider = dynamic(() => import('../widgets/PostsSlider/PostsSlider'))
// const PostsList = dynamic(() => import('../widgets/PostsList/PostsList'))
// const ImagesSlider = dynamic(() => import('../widgets/ImagesSlider/ImagesSlider'))
const WidgetText = dynamic(() => import('./WidgetText/WidgetText'))
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'))
const Searchbar = dynamic(() => import('../widgets/Searchbar/Searchbar'))

interface IProps {
    data: WidgetData,
    widgetId: string,
    locale: string,
    isSidebar: boolean,
    viewType?: string
}

// let WidgetStyledSection = styled.section`
//   ${({customStyles}: { customStyles: string }) => customStyles || ''}
// `

const WidgetWrapper: FC<IProps> = ({data, widgetId, isSidebar, viewType,locale}) => {

    const widgetMatcher = {
        // 'postsSlider': PostSlider,
        // 'postsList': PostsList,
        // 'postsListEntireByCategories': PostsListEntireByCategories,
        // 'posts':PostsCardsRenderer,
        // 'imagesSlider':ImagesSlider,
        // 'multipleLinkTo':MultipleLinkTo,
        // 'media':MediaWidget,
        // 'recentComments':RecentComments,
        'meta':MetaWidget,
        'metaWithImage':MetasCardsRenderer,
        // 'searchBar':Searchbar,
        // 'searchButton':Searchbar,
        'searchbar':Searchbar,
        'logo':Logo,
        // 'alphabeticalNumericalRange':AlphabeticalNumericalRangeLinksWidget,
        'language':LanguagesSwitcher,
        'authentication':Authentication,
        'linkTo':LinkTo,
        'menu':MenuWidget,
        // 'shoppingCart':ShoppingCart,
        'advertise':Advertise,
        'form':FormWidget,
        'dayModeNightMode':DayModeNightMode,
    }

    //@ts-ignore
    const WidgetToRender =  widgetMatcher?.[data?.type as string] || null

    return (
        <div className={'widget ' + (data?.extraClassName ?? '')}  id={data?.extraId || undefined}>
            {data?.title && <WidgetHeader translations={data?.translations}
                                          title={data?.title}
                                          locale={locale}
                                          redirectLink={data?.redirectLink}
                                          redirectToTitle={data?.redirectToTitle}
                                          footerLink={data?.footerLink}/>
            }
            {data?.text && <WidgetText translations={data?.translations} text={data?.text}  locale={locale}/>}

            {!!WidgetToRender && <WidgetToRender
                locale={locale}
                {...data}
                widgetId={widgetId}
                viewType={viewType}/>
            }

            {data?.customScript && <WidgetCustomScript customScript={data?.customScript}
                                                       customScriptStrategy={data?.customScriptStrategy}/>
            }

            {(!!data?.pagination && !!data?.redirectLink) && <WidgetPagination baseUrl={data?.redirectLink}
                                                                               totalCount={data?.uniqueData?.totalCount}
                                                                               count={data?.count}/>
            }

        </div>
    )
};
export default WidgetWrapper
