import {Translations} from "../Translations";

export interface IdentitySettings {
    favIcon: string;
    googleAnalyticsId: string;
    allowUserToPost: boolean;
    topbar?: string,
    header?: string,
    navigation?: string,
    footer?: string,
    keywords: string[],
    translations: Translations,
    title: string,
    categoriesPageTitle?: string,
    categoryPageTitle?: string,
    tagsPageTitle?: string,
    tagPageTitle?: string,
    actorsPageTitle?: string,
    actorPageTitle?: string,
    searchPageTitle?:string,
    siteName: string,
    themeColor: string,
    description: string,
    categoriesPageDescription?: string,
    categoryPageDescription?: string,
    tagsPageDescription?: string,
    tagPageDescription?: string,
    actorsPageDescription?: string,
    actorPageDescription?: string,
    searchPageDescription?:string,

    homePageSidebar: boolean | string,
    metaPageSidebar: boolean | string,
    postPageSidebar: boolean | string,
    postsPageSidebar: boolean | string,
    userPageSidebar: boolean | string,
    profilePageSidebar: boolean | string,
    tagPageSidebar: boolean | string,
    actorPageSidebar: boolean | string,
    categoryPageSidebar: boolean | string;
    categoriesPageSidebar: boolean | string;
    tagsPageSidebar: boolean | string;
    searchPageSidebar: boolean | string,
    actorsPageSidebar: boolean | string,
    customScriptsAsString: string,
    siteMode: string,
    cookieReadMoreLink: string,
    cookieTitleText: string,
    cookieMessageText: string,
    anyoneCanRegister: boolean,
    developmentMode: boolean,
    cookiePopupMessage: boolean,
    rtaContent: boolean,
    membership: boolean,
    postsCountPerPage?: number ,
}