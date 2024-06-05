export interface WidgetData {
    redirectLinkPosition: string;
    extraClassName: string;
    extraId: string;
    position: string;
    text: string;
    adCode: string;
    title: string;
    name: string;
    redirectLink: string;
    redirectToTitle: string;
    type: string;
    linkToWindowType: string;
    customStyles: string;
    customScript: string;
    customScriptStrategy: string;
    deviceTypeToRender: string;
    languageToRender: string;
    specificDayToRender: string;
    metaType: string;
    postType: string;
    sortBy: string;
    LogoText: string;
    LogoUrl: string;
    headLine: string;
    linkToType: string;
    cardWidthDesktop: number;
    linkToText: string;
    linkToAs: string;
    editMode: boolean;
    noSSR: boolean;
    linkTo: string;
    multipleLinks: [string];
    mediaUrl: string;
    mediaType: string;
    widgetIndex: number;
    selectedMetaForPosts: string;
    count: number;
    pagination: boolean;
    stayOpen: boolean;
    translations: {
        [key: string]: {
            [key: string]: string;
        };
    };
    uniqueData: UniqueDataTypes;
    menuItems: [];
    comments: [string];
    mobileNavigation: boolean;
}
export interface IMenuItem {
    icon?: string;
    name: string;
    target: string;
    type: string;
    parent?: string | number | readonly string[] | undefined;
    itemIndex: number;
    itemId: number;
    subItems?: IMenuItem[];
    translations?: {
        [key: string]: {
            [key: string]: string;
        };
    };
}
export interface Widget {
    _id: string;
    data: WidgetData;
}
export interface WidgetSettingsPropTypes {
    activeEditingLanguage: string;
    customStyleBox?: boolean;
    textBox?: boolean;
    customScriptBox?: boolean;
}
export interface UniqueDataTypes {
    [key: string]: any;
    translations?: {
        [key: string]: {
            [key: string]: string;
        };
    };
}
//# sourceMappingURL=Widget.d.ts.map