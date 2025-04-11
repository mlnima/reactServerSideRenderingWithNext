import { FC } from 'react';
import { IContentSettings, IWidgetData } from '@repo/typescript-types';
import dynamic from 'next/dynamic';
import './WidgetWrapper.scss';
import WidgetFooter from '@components/widgets/widgetWrapper/WidgetFooter/WidgetFooter';
//import ServerSideStore from '@store/ServerSideStore';

const WidgetHeader = dynamic(() => import('./WidgetHeader/WidgetHeader'));
const WidgetPagination = dynamic(() => import('./WidgetPagination/WidgetPagination'));
const PostsListEntireByCategories = dynamic(
    () => import('../widgets/PostsListEntireByCategories/PostsListEntireByCategories'),
);
// const RecentComments = dynamic(() => import('../widgets/RecentComments/RecentComments'))
const MetaWidget = dynamic(() => import('../widgets/MetaWidget/MetaWidget'));
const MediaWidget = dynamic(() => import('../widgets/MediaWidget/MediaWidget'));
const AlphabeticalNumericalRangeLinksWidget = dynamic(
    () => import('../widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeLinksWidget'),
);
const LanguagesSwitcher = dynamic(() => import('../widgets/LanguagesSwitcher/LanguagesSwitcher'));
const DayModeNightMode = dynamic(() => import('../widgets/DayModeNightMode/DayModeNightMode'));
const Logo = dynamic(() => import('../widgets/Logo/Logo'));
const LinkTo = dynamic(() => import('../widgets/LinkTo/LinkTo'));
const MenuWidget = dynamic(() => import('../widgets/MenuWidget/MenuWidget'));
const ShoppingCart = dynamic(() => import('../widgets/ShoppingCart/ShoppingCart'));
const FormWidget = dynamic(() => import('../widgets/FormWidget/FormWidget'));
const MultipleLinkTo = dynamic(() => import('../widgets/MultipleLinkTo/MultipleLinkTo'));
const Advertise = dynamic(() => import('../widgets/Advertise/Advertise'));
const PostsSliderWidget = dynamic(() => import('../widgets/PostsSliderWidget/PostsSliderWidget'));
const PostsListWidget = dynamic(() => import('@components/widgets/widgets/PostsListWidget/PostsListWidget'));
// const ImagesSlider = dynamic(() => import('../widgets/ImagesSlider/ImagesSlider'))
const WidgetText = dynamic(() => import('./WidgetText/WidgetText'));
const Authentication = dynamic(() => import('../widgets/Authentication/Authentication'), {
    // ssr: false,
    // loading:()=> <SkeletonRenderer height={50} width={200} count={1}/>
});
const Searchbar = dynamic(() => import('../widgets/Searchbar/Searchbar'));
const MetasCardsWidget = dynamic(() => import('@components/widgets/widgets/MetasCardsWidget/MetasCardsWidget'));
const PostsCardsWidget = dynamic(() => import('@components/widgets/widgets/PostsCardsWidget/PostsCardsWidget'));
const UserPreferenceConfigWidget = dynamic(
    () => import('@components/widgets/widgets/UserPreferenceConfigWidget/UserPreferenceConfigWidget'),
);

interface IProps {
    data: IWidgetData;
    widgetId: string;
    isSidebar?: boolean;
    locale:string;
    dictionary: {
        [key: string]: string;
    };
    contentSettings?: IContentSettings;
}

const WidgetWrapper: FC<IProps> = ({ data, widgetId, isSidebar, dictionary, locale,contentSettings }) => {
    const widgetMatcher = {
        postsSlider: PostsSliderWidget,
        postsList: PostsListWidget,
        postsListEntireByCategories: PostsListEntireByCategories,
        posts: PostsCardsWidget,
        // 'imagesSlider':ImagesSlider,
        multipleLinkTo: MultipleLinkTo,
        media: MediaWidget,
        // 'recentComments':RecentComments,
        meta: MetaWidget,
        metaWithImage: MetasCardsWidget,
        searchbar: Searchbar,
        logo: Logo,
        alphabeticalNumericalRange: AlphabeticalNumericalRangeLinksWidget,
        language: LanguagesSwitcher,
        authentication: Authentication,
        linkTo: LinkTo,
        menu: MenuWidget,
        shoppingCart: ShoppingCart,
        advertise: Advertise,
        form: FormWidget,
        userPreferenceConfig: UserPreferenceConfigWidget,
        dayModeNightMode: DayModeNightMode,
    };

    // @ts-expect-error: its fine
    const WidgetToRender = data?.type && widgetMatcher.hasOwnProperty(data?.type) ? widgetMatcher?.[data.type] : null;

    const widgetExtraClass = data?.extraClassName ? ` ${data?.extraClassName}` : '';
    const widgetClass = `widget ${data?.type}WrapperWidget${widgetExtraClass}`;

    return (
        <div className={widgetClass} id={data?.extraId || undefined}>
            {(data?.title || data?.translations?.[locale]?.title) && (
                <WidgetHeader
                    title={data?.translations?.[locale]?.title || data?.title}
                    dictionary={dictionary}
                    pagination={data?.pagination}
                    redirectLinkPosition={data?.redirectLinkPosition}
                    redirectLink={data?.redirectLink}
                    redirectToTitle={data?.translations?.[locale]?.redirectToTitle || data?.redirectToTitle}
                />
            )}
            {data?.text && <WidgetText translations={data?.translations} text={data?.text} locale={locale} />}

            {!!WidgetToRender && (
                <WidgetToRender
                    {...data}
                    dictionary={dictionary}
                    locale={locale}
                    isSidebar={isSidebar}
                    widgetId={widgetId}
                    contentSettings={contentSettings}
                />
            )}

            {data?.redirectLinkPosition === 'bottom' && (
                <WidgetFooter
                    redirectLink={data?.redirectLink}
                    dictionary={dictionary}
                    redirectToTitle={data?.translations?.[locale]?.redirectToTitle || data?.redirectToTitle}
                />
            )}

            {!!data?.pagination &&
                !!data?.redirectLink &&
                data?.uniqueData?.totalCount > (data?.count || data?.uniqueData?.count) && (
                    <WidgetPagination
                        baseUrl={data?.redirectLink}
                        sortBy={data?.sortBy}
                        totalCount={data?.uniqueData?.totalCount}
                        count={data?.count || data?.uniqueData?.count}
                    />
                )}
        </div>
    );
};
export default WidgetWrapper;
