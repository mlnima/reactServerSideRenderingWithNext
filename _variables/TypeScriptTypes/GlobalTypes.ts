import type {NextApiRequest, NextApiResponse} from 'next';
import {PostTypes} from "./PostTypes";
import {AdminPanelUsersState} from "../../store/adminReducers/adminPanelUsersReducer";


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
    postsCountPerPage: number,
}

// user
export interface User {
    _id?: string,
    username?: string,
    role?: string,
    profileImage?: string,
    followers:object[],
    following:object[],
}


export interface UserState {
    userData?: User,
    socketId?: string,
    loggedIn: boolean,
    userPageData?: object,
    conversations?: { _id: string }[],
    activeConversation?: {
        messages?: object[],
        users?: User[]
    },
    callData: {
        myVideo?: any,
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
    pageName:string,
    sidebar:string,
    status: string,
    imageUrl:string,
    pageStyle:string
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
        editMode: boolean,
        widgetIndex:number
    }
}

export interface MetasPropTypes {
    imageUrl?: string;
    metas: Meta[],
    totalCount: number
}

export interface GetServerSidePropsContext {
    req?: object,
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
    _id:string,
    name: string,
    description?: string,
    type: string,
    status?: string,
    imageUrl?: string,
    imageUrlLock?:boolean,
    translations?: Translations,
    count?: number,
    additionalInfo?: object,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface AxiosResponseTypes{
    message?:string,
    posts:PostTypes[]
    post:PostTypes
}

export interface AxiosErrorTypes{
    message?:string
}




export interface WidgetsStateInterface {
    widgets: {
        widgets: WidgetPropTypes[]
    }
}


export interface ChatroomStateTypes {

    onlineUsers: object[],
    messages: object[],
    activeVisibleProfile: object

}

export interface PostStateTypes {
    posts: PostTypes[],
    actorData: Meta,
    categoryData: Meta,
    tagData: Meta,
    totalCount: number,
    post: PostTypes,
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
    users: User[],
    post?: PostTypes,
    totalCount:number,
    posts?: PostTypes[],
    meta?:Meta,
    metas?:Meta[],
    activeEditingLanguage: string
}

export interface AdminPanelGlobalState{
    customPages: string[],
    users:User[],
    forms:[],
    pages:[],
    metas:[],
    orders:[],
}

export interface StoreTypes {
    adminPanelUsers: AdminPanelUsersState,
    adminPanelGlobalState: AdminPanelGlobalState,
    adminPanelPosts: AdminPanelPostsTypes
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
