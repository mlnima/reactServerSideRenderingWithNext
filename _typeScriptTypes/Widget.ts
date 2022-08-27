export interface Widget{
    data: {
        extraClassName: string,
        extraId: string,
        position: string,
        text: string,
        adCode: string,
        title: string,
        name: string,
        redirectLink: string,
        redirectToTitle: string,
        type: string,
        linkToWindowType: string,
        customStyles: string,
        customScript: string,
        customScriptStrategy: string,
        deviceTypeToRender: string,
        languageToRender: string,
        specificDayToRender: string,
        metaType: string,
        postType: string,
        sortBy: string,
        LogoText: string,
        LogoUrl: string,
        headLine: string,
        linkToType: string,
        cardWidthDesktop: number,
        linkToText: string,
        linkToAs: string,
        editMode: boolean,
        noSSR: boolean,
        linkTo: string,
        multipleLinks: [string],
        mediaUrl: string,
        mediaType: string,
        widgetIndex: number,
        selectedMetaForPosts: string,
        count: number,
        pagination: boolean,
        stayOpen: boolean,
        translations: {
            [key:string]:{
                [key:string]:string
            }
        },
        uniqueData:{
            [key:string]:any
        },
        menuItems: {
            [key:string]:any
        },
        comments: [string]
    }
}