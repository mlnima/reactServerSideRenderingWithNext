export interface GlobalState {
    loginRegisterFormPopup: boolean | string,
    beforeUnload:boolean,
    loading: boolean,
    notFoundPage: boolean,
    isSiteIdentitySet: boolean,
    isSiteDesignSet: boolean,
    console: boolean,
    headData:{
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