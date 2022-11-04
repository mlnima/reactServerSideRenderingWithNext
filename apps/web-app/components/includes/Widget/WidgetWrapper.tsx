import dynamic from "next/dynamic";
import styled from "styled-components";
import {FC, memo, useMemo} from "react";
import {WidgetData} from "typescript-types";

const WidgetHeader = dynamic(() => import('./WidgetHeader/WidgetHeader'))
const WidgetCustomScript = dynamic(() => import('./WidgetCustomScript/WidgetCustomScript'))
const WidgetPagination = dynamic(() => import('./WidgetPagination/WidgetPagination'))
const Posts = dynamic(() => import('../cards/CardsRenderer/PostsCardsRenderer'))
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

let WidgetStyledSection = styled.section`
  ${({customStyles}: { customStyles: string }) => customStyles || ''}
`

const WidgetWrapper: FC<WidgetComponentPropTypes> = ({data, widgetId, isSidebar, viewType}) => {

    const idAttribute = useMemo(() => data?.extraId ? {id: data?.extraId} : {}, [data])

    const WidgetToRender = useMemo(() => {
        return data.type === 'postsSlider' ? PostSlider :
            data.type === 'posts' ? Posts :
                data.type === 'imagesSlider' ? ImagesSlider :
                    data.type === 'multipleLinkTo' ? MultipleLinkTo :
                        data.type === 'media' ? MediaWidget :
                            data.type === 'recentComments' ? RecentComments :
                                data.type === 'meta' ? MetaWidget :
                                    data.type === 'metaWithImage' ? MetasCardsRenderer :
                                        data.type === 'searchBar' ? Searchbar :
                                            data.type === 'searchButton' ? Searchbar :
                                                data.type === 'searchbar' ? Searchbar :
                                                    data.type === 'logo' ? Logo :
                                                        data.type === 'alphabeticalNumericalRange' ?
                                                            AlphabeticalNumericalRangeLinksWidget :
                                                            data.type === 'language' ? LanguagesSwitcher :
                                                                data.type === 'authentication' ? Authentication :
                                                                    data.type === 'linkTo' ? LinkTo :
                                                                        data.type === 'menu' ? MenuWidget :
                                                                            data.type === 'shoppingCart' ? ShoppingCart :
                                                                                data.type === 'advertise' ? Advertise :
                                                                                    data.type === 'form' ? FormWidget :
                                                                                        data.type === 'dayModeNightMode' ? DayModeNightMode
                                                                                            : null;
    }, [])



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

            {data?.text && <Text translations={data?.translations} text={data?.text}/>}
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
export default memo(WidgetWrapper);