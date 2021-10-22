import type {NextApiRequest, NextApiResponse} from 'next'
import {PostTypes} from "./PostTypes";


// SETTINGS
export interface DesignSettings {
    customStyle: string;
    topBarStyle: string;
    headerStyle: string;
    footerStyle: string;
    customStyles: string;
    postElementStyle: string;
    navigationStyle: string;
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

export interface IdentitySettings {
    keywords: string[];
    translations: Translations;
    title: string;
    themeColor: string;
    description: string;
    homePageSidebar: boolean | string;
    metaPageSidebar: boolean | string;
    postPageSidebar: boolean | string;
    postsPageSidebar: boolean | string;
    userPageSidebar: boolean | string;
    tagPageSidebar: boolean | string;
    actorPageSidebar: boolean | string;
    searchPageSidebar: boolean | string;
    actorsPageSidebar: boolean | string;
    customScriptsAsString: string;
    siteMode: string;
    cookieReadMoreLink: string;
    cookieTitleText: string;
    cookieMessageText: string;
    anyoneCanRegister: boolean;
    developmentMode: boolean;
    cookiePopupMessage: boolean;
    membership: boolean;
    postsCountPerPage: number;
}

// user
export interface User {
    _id?: string;
    username?: string;
    role?: string,
    profileImage?: string
}

export interface UserState {
    userData?: User;
    socketId?: string;
    loggedIn: boolean;
    userPageData?: object;
    conversations?: { _id: string }[];
    activeConversation?: {
        messages?: object[],
        users?: User[]
    };
    callData: {
        myVideo?: any;
        partnerVideo?:any,
        callerSignal?: any,
        calling?:boolean,
        receivingCall?:boolean,
        callAccepted?:boolean,
        callerName?:string,
        callerId?:string,
        userStreamData:any
    }
}


export interface settingsPropTypes {
    settings: {
        design: DesignSettings,
        identity: IdentitySettings
    };
    posts: {
        post: PostTypes,
        comments: object[]
    };
}

// export interface SettingsTypes {
//     design:DesignSettings,
//     identity:IdentitySettings,
//     eCommerce:object,
// }


export interface WidgetPropTypes {
    _id: string,
    data: {
        position: string,
        type: string,
        metaType: string,
        viewType: string,
        deviceTypeToRender: string,
        languageToRender: string,
        editMode: boolean
    }
}

export interface MetasPropTypes {
    metas: object[],
    totalCount: number
}

export interface GetServerSidePropsContext {
    req?: object;
    notFound?: boolean;
    query?: {
        actorId?: string | undefined
        tagId?: string | undefined
        categoryId?: string | undefined
    },
    locale?: string | undefined;
    locales?: string[];
    defaultLocale?: string;
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
    createdAt: Date;
    updatedAt: Date;
}


export interface WidgetInterface {
    data: {
        position: string
        widgetIndex: number
    }
}

export interface WidgetsStateInterface {
    widgets: {
        widgets: WidgetInterface[]
    }
}


export interface ChatroomStateTypes {

    onlineUsers: object[],
    messages: object[],
    activeVisibleProfile: object

}

export interface PostStateTypes {
    posts: object[],
    actorData: object,
    categoryData: object,
    tagData: object,
    totalCount: number,
    post: object,
    comments: object[],
}

export interface SettingsStateTypes {
    design: DesignSettings,
    identity: IdentitySettings,
    eCommerce: object,
}

export interface WidgetsStateTypes {
    widgets: WidgetPropTypes[],
}

export interface GlobalStateTypes {
    loginRegisterFormPopup: boolean | string,
    loading: boolean,
    isSiteIdentitySet: boolean,
    isSiteDesignSet: boolean,
    console: boolean,
    alert: {
        active: boolean,
        message: string,
        type: string,
        err: {
            stack: any
        }
    }
}

export interface Translations {
    [key: string]: {}
}


export interface AdminPanelPostsTypes {
    post?: {
        title?: string,
        description?: string,
        translations?: Translations,
        author?: string,
        _id?: string,
        status?: string,
        postType?: string,
    },
    activeEditingLanguage: string
}

export interface StoreTypes {
    chatroom: ChatroomStateTypes,
    settings: SettingsStateTypes,
    posts: PostStateTypes,
    user: UserState,
    widgets: WidgetsStateTypes,
    globalState: GlobalStateTypes;
    adminPanelPosts: AdminPanelPostsTypes
}


export interface ServerPropTypes {
    req?: NextApiRequest;
    res?: NextApiResponse;
    locale: string;
    locales: string[];
    defaultLocale: string;
    resolvedUrl?: string | undefined;
}


export interface InputOnChangeHandlerTypes {
    target: {
        name?: any
        value?: any

    }
    currentTarget: {
        name?: string
        value?: any
    }
}
