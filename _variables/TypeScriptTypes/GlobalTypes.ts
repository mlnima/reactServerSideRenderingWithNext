export interface DesignSettings{
    customStyle:string;
    topBarStyle:string;
    headerStyle:string;
    footerStyle:string;
    customStyles:string;
    postElementStyle:string;
    navigationStyle:string;
    actorPageStyle: string;
    postsPageStyle: string;
    postPageStyle: string;
    customColors: string;
    homePageSidebar: boolean;
    homePageStyle: boolean;
    postElementSize: string;
    postElementImageLoader: string;
    postElementImageLoaderType: string;
}

export interface Translations {

}
export interface settingsPropTypes {
    settings: {
        design: DesignSettings,
        identity: IdentitySettings
    };
    posts:{
        post:object,
        comments:object[]
    };


}
export interface WidgetPropTypes {
    _id:string,
    data: {
        position: string,
        type: string,
        metaType: string,
        viewType: string,
        deviceTypeToRender:string,
        languageToRender:string,
        editMode:boolean
    }
}
export interface MetasPropTypes {
    metas:object[],
    totalCount:number
}

export interface GetServerSidePropsContext {
    req?:object;
    isMobile?:boolean;
    notFound?:boolean;
    query?:{
        actorId?:string|undefined
        tagId?:string|undefined
        categoryId?:string|undefined
    },
    locale?:string|undefined;
    locales?:string[];
    defaultLocale?:string;
}

export interface Meta {
    name: string;
    description: string;
    type: string;
    status: string;
    imageUrl: string;
    translations: Translations;
    count: number;
    additionalInfo: object;
    createdAt:Date;
    updatedAt:Date;
}

export interface IdentitySettings {
    keywords:string[];
    translations:Translations;
    title:string;
    themeColor:string;
    description:string;
    homePageSidebar:boolean|string;
    metaPageSidebar:boolean|string;
    postPageSidebar:boolean|string;
    postsPageSidebar:boolean|string;
    userPageSidebar:boolean|string;
    tagPageSidebar:boolean|string;
    actorPageSidebar:boolean|string;
    searchPageSidebar:boolean|string;
    actorsPageSidebar:boolean|string;

    customScriptsAsString:string;
    siteMode:string;
    cookieReadMoreLink:string;
    cookieTitleText:string;
    cookieMessageText:string;

    anyoneCanRegister:boolean;
    developmentMode:boolean;
    cookiePopupMessage:boolean;
    membership:boolean;
    postsCountPerPage:number;
}

export interface WidgetInterface {
    data: {
        position: string
    }
}

export interface WidgetsStateInterface {
    widgets: {
        widgets: WidgetInterface[]
    }
}

