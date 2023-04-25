export interface GlobalState {
    loginRegisterFormPopup: boolean | string,
    loading: boolean,
    adminMode: boolean,
    headerSize: number,
    notFoundPage: boolean,
    headData:{
        allowIndexByRobots?: Boolean;
        canonicalUrl?: string;
        rtaContent?:boolean,
        twitterCard?:boolean,
        canonical?:boolean,
        keywords?: string[],
        title?: string,
        description?: string,
        themeColor?: string,
        favIcon?:string,
        customScriptsAsString?:string,
        ogTitle?:string,
        ogType?:string,
        ogUrl?:string,
        ogDescription?:string,
        ogImage?:string,
        ogSiteName?:string,
        ogLocale?:string,
        twitterSite?:string,
        twitterUrl?:string,
        twitterTitle?:string,
        twitterDescription?:string,
        twitterImage?:string,
        applicationName?:string,

    }
    alert: {
        active?: boolean,
        message?: string,
        type?: string,
        err?: {
            stack: any
        }
    }
}