export interface IHeadDataSettings {
  favIconUrl: string,
  pwa192: string,
  pwa384: string,
  pwa512: string,
  googleAnalyticsId: string,
  keywords: string,
  title: string,
  siteName: string,
  themeColor: string,
  description: string,
  display: string,
  start_url: string,
  orientation: string,
  customHeadTags: string,
  customScripts: string,
  rtaContent: boolean,
  translations: {
    [key: string]: {
      title: string,
      keywords: string,
      description: string
    }
  },
}

export interface IContentSettings {
  numberOfCardsPerRowInMobile: number,
  contentPerPage?: number,
  cardsWidthDesktop: number,

  postSettings: {
    [key: string]: {
      viewSystem: boolean,
      showViewsOnCard: boolean,
      ratingSystem: boolean,
      showRatingOnCard: boolean,
      showDateOnCard: boolean,
      showDateInPostPage: boolean,
      allowComment: boolean,
    }
  }
}


export interface IInitialSettings {
  headDataSettings: IHeadDataSettings,
  membershipSettings: {
    allowUserToPost: boolean,
    membership: boolean,
    anyoneCanRegister: boolean,
    usersCanFollowEachOther: boolean,
    usersCanMessageEachOther: boolean,
    usersCanCommentOnThePosts: boolean,
    usersPersonalEmailAddress: boolean,
    verificationRequired: boolean,
    postByUserSettings: {
      [key: string]: {
        allow: boolean,
        maxCategories: number,
        maxTags: number,
        maxActors: number,
      }
    }
  },
  layoutSettings: {
    topbar: boolean,
    header: boolean,
    navigation: boolean,
    footer: boolean,
    sidebarWidth: number,
    languagesSwitcherInUserConfigMenu: boolean,
    themeColorsSwitcherInUserConfigMenu: boolean,
    customStyles: string,
    defaultTheme: 'dark' | 'light',
    primaryModeColors: string,
    secondaryModeColors: string,
    maxInnerContentWidth: number,
    logoUrl: string,
    logoWidth: number,
    logoHeight: number,
  },
  eCommerceSettings?: {},
  contentSettings?: IContentSettings
}