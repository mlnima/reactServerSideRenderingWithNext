import type {NextApiRequest, NextApiResponse} from 'next';
import {Comment, PostTypes} from "./PostTypes";
import {AdminPanelUsersState} from "@store/adminReducers/adminPanelUsersReducer";
import {AdminPanelWidgetsTypes, WidgetsStateTypes} from "@_variables/TypeScriptTypes/Widgets";


// SETTINGS
export interface DesignSettings {
    sideBarWidth: number,
    customStyle: string,
    topBarStyle: string,
    headerStyle: string,
    footerStyle: string,
    customStyles: string,
    postElementStyle: string,
    navigationStyle: string,
    actorPageStyle: string,
    categoryPageStyle: string,
    tagPageStyle: string,
    postsPageStyle: string,
    postPageStyle: string,
    customColors: string,
    homePageSidebar: boolean,
    homePageStyle: boolean,
    postElementSize: string,
    postElementImageLoader: string,
    postElementImageLoaderType: string,
}

export interface IdentitySettings {
    favIcon: string;
    googleAnalyticsId: string;
    postsPerRawForMobile: number;
    allowUserToPost: boolean;
    topbar?: string,
    header?: string,
    navigation?: string,
    footer?: string,
    keywords: string[],
    translations: Translations,
    title: string,
    themeColor: string,
    description: string,
    homePageSidebar: boolean | string,
    metaPageSidebar: boolean | string,
    postPageSidebar: boolean | string,
    postsPageSidebar: boolean | string,
    userPageSidebar: boolean | string,
    tagPageSidebar: boolean | string,
    actorPageSidebar: boolean | string,
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
    membership: boolean,
    postsCountPerPage?: string ,
}

// user
export interface User {
    keyMaster?: boolean;
    API_KEY?: string;
    status?: string;
    about?: string;
    nickName?: string;
    firstName?: string,
    lastName?: string,
    email?: string,
    _id?: string,
    username: string,
    role: string,
    profileImage?: string,
    followers?: {}[],
    following?: {}[],
}


export interface UserState {
    userData?: User,
    socketId?: string,
    loggedIn: boolean,
    userPageData?: {},
    conversations?: { _id: string }[],
    activeConversation?: {
        messages?: {}[],
        users?: User[]
    },
    callData: {
        myVideo?: any,
        partnerVideo?: any,
        callerSignal?: any,
        calling?: boolean,
        receivingCall?: boolean,
        callAccepted?: boolean,
        callerName?: string,
        callerId?: string,
        userStreamData: any
    }
}


export interface settingsPropTypes {
    // adminPanelPosts: PostTypes[],
    user: UserState,
    settings: {
        design: DesignSettings,
        identity: IdentitySettings
    },
    // posts: {
    //     post: PostTypes,
    //     comments: object[]
    // },
}


// user
export interface PageTypes {
    _id?: string,
    pageName: string,
    sidebar: string,
    status: string,
    imageUrl: string,
    pageStyle: string
}

// export interface SettingsTypes {
//     design:DesignSettings,
//     identity:IdentitySettings,
//     eCommerce:object,
// }




export interface MetasPropTypes {
    imageUrl?: string;
    metas: Meta[],
    totalCount: number
}

export interface GetServerSidePropsContext {
    req?: {},
    notFound?: boolean,
    query?: {
        actorId?: string | undefined
        tagId?: string | undefined
        categoryId?: string | undefined
    },
    locale?: string | undefined,
    locales?: string[],
    defaultLocale?: string,
}

export interface Meta {
    coverImageUrl?: string,
    _id: string,
    name: string,
    description?: string,
    type: string,
    status?: string,
    imageUrl?: string,
    imageUrlLock?: boolean,
    translations?: Translations,
    count?: number,
    additionalInfo?: {},
    createdAt?: Date,
    updatedAt?: Date,
}

export interface AxiosResponseTypes {
    message?: string,
    posts: PostTypes[]
    post: PostTypes
}

export interface AxiosErrorTypes {
    message?: string
}

export interface ChatroomStateTypes {

    onlineUsers: {}[],
    messages: {}[],
    activeVisibleProfile: {}

}

export interface PageDataPropTypes {
    pageName: string,
    _id: string,
    sidebar: string,
    status: string,
    imageUrl: string,
    pageStyle: string,
}

export interface PostStateTypes {
    tagsMetas: Meta[],
    categoriesMetas: Meta[],
    actorsMetas: Meta[],
    pageData: PageDataPropTypes,
    posts: PostTypes[],
    actorData: Meta,
    categoryData: Meta,
    tagData: Meta,
    totalCount: number,
    post: PostTypes,
    editingPost: PostTypes,
    comments: {}[],
}

export interface SettingsStateTypes {
    isMobile: boolean,
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    eCommerce: {},
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
    [key: string]: {
        cookieTitleText?: string,
        cookieMessageText?: string,
        title: string,
        keywords: string[],
        description: string,
        name?: string
    }
}


export interface AdminPanelPostsTypes {
    // users: User[],
    post?: PostTypes,
    totalCount: number,
    posts?: PostTypes[],
    meta?: Meta,
    metas?: Meta[],
    activeEditingLanguage: string
}
export interface AdminPanelSettingsTypes {
    isMobile?: boolean,
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    eCommerce?: {},
}




export interface AdminPanelCommentsTypes {
    comments: Comment[],
    comment: Comment
}

export interface AdminPanelFormsTypes {
    forms: any[],
    form: any
}

export interface AdminPanelPagesTypes {
    pages: any[],
    page: any
}

export interface AdminPanelOrdersTypes {
    orders: any[],
    order: any
}

export interface AdminPanelGlobalState {
    sidebar: boolean;
    customPages: string[],
    users: User[],
    forms: [],
    pages: [],
    metas: [],
    orders: [],
}

export interface AdminPanelTerminalState {
    command: string,
    logs: string[],
    lastCommandResult: string,
    commandsHistory: string[]
}

export interface StoreTypes {
    adminPanelComments: AdminPanelCommentsTypes;
    adminPanelSettings: AdminPanelSettingsTypes;
    adminPanelForms: AdminPanelFormsTypes;
    adminPanelPages: AdminPanelPagesTypes;
    adminPanelOrders: AdminPanelOrdersTypes;
    adminPanelUsers: AdminPanelUsersState,
    adminPanelGlobalState: AdminPanelGlobalState,
    adminPanelPosts: AdminPanelPostsTypes,
    adminPanelTerminalState: AdminPanelTerminalState,
    adminPanelWidgets: AdminPanelWidgetsTypes,
    chatroom: ChatroomStateTypes,
    settings: SettingsStateTypes,
    posts: PostStateTypes,
    user: UserState,
    widgets: WidgetsStateTypes,
    globalState: GlobalStateTypes,
}


export interface ServerPropTypes {
    req?: NextApiRequest,
    res?: NextApiResponse,
    locale: string,
    locales: string[],
    defaultLocale: string,
    resolvedUrl?: string | undefined,
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


//-------------------------------
// export interface WidgetPropTypes {
//     _id: string,
//     data: WidgetDataPropTypes
// }
//
// export interface WidgetDataPropTypes {
//     footerLink: string;
//     redirectToTitle: string;
//     translations: {};
//     uniqueData: any;
//     noSSR: boolean;
//     specificDayToRender: string;
//     pagination: boolean,
//     redirectLink: string,
//     customScriptStrategy: string,
//     customScript?: string,
//     text?: string,
//     position: string,
//     type: string,
//     extraClassName?: string,
//     extraId?: string,
//     title?: string,
//     customStyles?: string,
//     metaType: string,
//     viewType: string,
//     deviceTypeToRender: string,
//     languageToRender: string,
//     editMode: boolean,
//     widgetIndex: number,
//     count: number,
// }