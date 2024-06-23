export interface InitialSettings {
    postCardsSettings: {
        customStyles: string;
        numberOfCardsPerRowInMobile: number;
        numberOfCardsPerPage?: number;
        cardsWidthDesktop: number;
        fallbackImageUrlOnError: string;
        customCardBackgrounds: string[];
    };
    headDataSettings: {
        favIconUrl: string;
        pwa192: string;
        pwa384: string;
        pwa512: string;
        googleAnalyticsId: string;
        keywords: string;
        title: string;
        siteName: string;
        themeColor: string;
        description: string;
        customHeadTags: string;
        custom3rdPartyScripts: string;
        rtaContent: boolean;
        translations: {
            [key: string]: {
                title: string;
                keywords: string;
                description: string;
            };
        };
    };
    membershipSettings: {
        allowUserToPost: boolean;
        membership: boolean;
        anyoneCanRegister: boolean;
        usersCanFollowEachOther: boolean;
        usersCanMessageEachOther: boolean;
        usersCanCommentOnThePosts: boolean;
        usersPersonalEmailAddress: boolean;
        verificationRequired: boolean;
    };
    layoutSettings: {
        topbar: boolean;
        header: boolean;
        navigation: boolean;
        footer: boolean;
        sidebarWidth: number;
        languagesSwitcherInUserConfigMenu: boolean;
        themeColorsSwitcherInUserConfigMenu: boolean;
        customStyles: string;
        defaultTheme: 'dark' | 'light';
        primaryModeColors: string;
        secondaryModeColors: string;
        logoUrl: string;
        logoWidth: number;
        logoHeight: number;
    };
    eCommerceSettings: {};
}
//# sourceMappingURL=InitialSettings.d.ts.map