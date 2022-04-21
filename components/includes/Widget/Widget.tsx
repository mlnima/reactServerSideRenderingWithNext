import dynamic from "next/dynamic";
import styled from "styled-components";
import {FC, useMemo} from "react";
import {WidgetDataPropTypes} from "@_variables/TypeScriptTypes/Widgets";
const WidgetHeader = dynamic(() => import('./WidgetHeader/WidgetHeader'))
const WidgetCustomScript = dynamic(() => import('./WidgetCustomScript/WidgetCustomScript'))
const WidgetPagination = dynamic(() => import('./WidgetPagination/WidgetPagination'))
const Posts = dynamic(() => import('../PostsRenderer/PostsRenderer'))
const CategoriesRenderer = dynamic(() =>
    import('../pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer'))
const TagsRenderer = dynamic(() =>
    import('../pagesComponents/tagsPageComponents/Components/TagsRenderer/TagsRenderer'))
const ActorsRenderer = dynamic(() =>
    import('../pagesComponents/actorsPageComponents/Components/ActorsRenderer'))
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
const ImagesSwiper = dynamic(() => import('../widgets/ImagesSwiper/ImagesSwiper'))
const PostSwiper = dynamic(() => import('../widgets/PostSwiper/PostSwiper'))
const PostSlider = dynamic(() => import('../widgets/PostsSlider/PostsSlider'))
const ImagesSlider = dynamic(() => import('../widgets/ImagesSlider/ImagesSlider'))
const Text = dynamic(() => import('./WidgetsModelsComponents/Text/Text'))
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'))
const Searchbar = dynamic(() => import('../widgets/Searchbar/Searchbar'))

interface WidgetComponentPropTypes {
    data: WidgetDataPropTypes,
    widgetId: string,
    isSidebar: boolean,
    viewType?: string
}

let WidgetStyledSection = styled.section`
  ${({customStyles}: { customStyles: string }) => customStyles || ''}
`

const Widget: FC<WidgetComponentPropTypes> = ({data, widgetId, isSidebar, viewType}) => {

    const idAttribute = useMemo(()=>data?.extraId ? {id: data?.extraId} : {},[data])
    // const idAttribute = data?.extraId ? {id: data?.extraId} : {}

    const WidgetToRender = useMemo(()=>{
            return data.type === 'posts' ? Posts :
            data.type === 'postsSwiper' ? PostSwiper :
            data.type === 'postsSlider' ? PostSlider :
            data.type === 'imagesSlider' ? ImagesSlider :
            data.type === 'multipleLinkTo' ? MultipleLinkTo :
            data.type === 'media' ? MediaWidget :
            data.type === 'recentComments' ? RecentComments :
            data.type === 'meta' ? MetaWidget :
            data.type === 'metaWithImage' && data.metaType === 'categories' ?
            CategoriesRenderer :
            data.type === 'metaWithImage' && data.metaType === 'tags' ?
            TagsRenderer :
            data.type === 'metaWithImage' && data.metaType === 'actors' ?
            ActorsRenderer :
           // data.type === 'searchBar' ? SearchInputComponent :
            data.type === 'searchBar' ? Searchbar :
            data.type === 'searchButton' ? Searchbar :
            data.type === 'logo' ? Logo :
            data.type === 'alphabeticalNumericalRange' ?
            AlphabeticalNumericalRangeLinksWidget :
            data.type === 'language' ? LanguagesSwitcher :
            data.type === 'authentication' ? Authentication :
            data.type === 'linkTo' ? LinkTo :
            data.type === 'imagesSwiper' ? ImagesSwiper :
            data.type === 'menu' ? MenuWidget :
            data.type === 'shoppingCart' ? ShoppingCart :
            data.type === 'advertise' ? Advertise :
            data.type === 'form' ? FormWidget:
            data.type === 'dayModeNightMode' ? DayModeNightMode
            : null;
    },[])

    return (
        <WidgetStyledSection {...idAttribute}
                             className={'widget ' + (data?.extraClassName ?? '')}
                             customStyles={data?.customStyles || ''}
        >
            {data?.title &&
                <WidgetHeader translations={data?.translations}
                              title={data?.title}
                              redirectLink={data?.redirectLink}
                              redirectToTitle={data?.redirectToTitle}
                              footerLink={data?.footerLink}

                />
            }

            {data?.text && <Text translations={data?.translations} text={data?.text}/> }
            {WidgetToRender ?

                <WidgetToRender
                    {...data}
                    //@ts-ignore
                    widgetId={widgetId}
                    isSidebar={isSidebar}
                    viewType={viewType}
                />
                : null
            }
            {data?.customScript &&
                <WidgetCustomScript customScript={data?.customScript}
                                    customScriptStrategy={data?.customScriptStrategy}
                />
            }
            {data?.pagination && data?.redirectLink ?
                <WidgetPagination baseUrl={data?.redirectLink}
                                  totalCount={data?.uniqueData?.totalCount}
                                  count={data?.count}
                />
                : null
            }
        </WidgetStyledSection>
    );
};
export default Widget;
