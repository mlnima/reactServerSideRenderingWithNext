const defaultInitialSettings = {
    "type" : "initialSettings",
    "data" : {

        "membershipSettings" : {
            "membership" : false,
            "anyoneCanRegister" : false,
            "usersCanFollowEachOther" : false,
            "usersCanMessageEachOther" : false,
            "usersCanCommentOnThePosts" : false,
            "allowUserToPost" : false
        },
        "layoutSettings" : {
            "topbar" : true,
            "header" : true,
            "navigation" : true,
            "footer" : true,
            "customStyles" : "",
            "customColors" : "",
            "sidebarWidth" : 320,
            "secondaryModeColors" : ":root{\r\n    --primary-text-color: #000;\r\n    --secondary-text-color: #4A4A4A;\r\n    --tertiary-text-color: #757575;\r\n    --primary-background-color: #fff;\r\n    --secondary-background-color: #E0E0E0;\r\n    --tertiary-background-color: #C8C8C8;\r\n}",
            "languagesSwitcherInUserConfigMenu" : true,
            "themeColorsSwitcherInUserConfigMenu" : true,
            "logoUrl" : "/asset/images/default/logo/Logo.png",
            "logoWidth" : 300,
            "logoHeight" : 100,
        },
        "headDataSettings" : {
            "title" : "Website",
            "description" : "Content Management System",
            "translations" : {},
            "favIconUrl" : "\\asset\\images\\default\\favicon.ico",
            "siteName" : "Positron",
            "themeColor" : "#000",
            "customHeadTags" : "",
            "googleAnalyticsId" : ""
        },
        "contentSettings":{
            "numberOfCardsPerRowInMobile" : 2,
            "numberOfCardsPerPage" : 20,
        }
    }
}

export default defaultInitialSettings