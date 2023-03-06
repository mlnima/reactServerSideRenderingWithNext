export interface InitialSettings{
    postCardsSettings:{
        customStyles:string,
        numberOfCardsPerRow: number,
        numberOfCardsPerPage?: number ,
        cardsWidthDesktop: number
    },
    headDataSettings:{
        favIconUrl: string,
        googleAnalyticsId: string,
        keywords: string,
        title:string,
        siteName: string,
        themeColor: string,
        description: string,
        customHeadTags: string,
        rtaContent: boolean,
        translations:{
            [key: string]:{
                title: string,
                keywords: string,
                description: string,
            }
        }
    },
    membershipSettings:{
        allowUserToPost: boolean,
        membership: boolean,
        anyoneCanRegister: boolean,
        usersCanFollowEachOther: boolean,
        usersCanMessageEachOther: boolean,
        usersCanCommentOnThePosts: boolean,

    },
    layoutSettings:{
        topbar: boolean,
        header: boolean,
        navigation: boolean,
        footer: boolean,
        customStyles:string,
    }
}