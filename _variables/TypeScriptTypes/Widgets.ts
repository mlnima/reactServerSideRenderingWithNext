export interface WidgetDataPropTypes {

    mediaType?: string;
    name?: string;
    footerLink?: string;
    redirectToTitle?: string;
    translations?: {};
    uniqueData?: UniqueDataTypes;
    noSSR?: boolean;
    specificDayToRender?: string;
    pagination?: boolean,
    stayOpen?: boolean,
    redirectLink?: string,
    customScriptStrategy?: string,
    customScript?: string,
    text?: string,
    position?: string,
    type?: string,
    extraClassName?: string,
    extraId?: string,
    title?: string,
    customStyles?: string,
    metaType?: string,
    viewType?: string,
    deviceTypeToRender?: string,
    languageToRender?: string,
    editMode?: boolean,
    widgetIndex?: number,
    count?: number,
}

export interface WidgetSettingsPropTypes {
    activeEditingLanguage?:string,
}

export interface UniqueDataTypes {
    [key: string]:any,
    translations?:{
        [key: string]:any,
    },
    linkTo?: string,
    linkToWindowType?: string,
    linkToText?: string,
    posts?: [],
    metaData?: []
}
export interface WidgetPropTypes {

    _id: string,
    data: WidgetDataPropTypes
}


export interface WidgetsStateInterface {
    widgets: {
        widgets: WidgetPropTypes[]
    }
}

export interface WidgetsStateTypes {
    widgetInGroups: {};
    widgets: WidgetPropTypes[],
}

export interface AdminPanelWidgetsTypes {
    adminPanelWidgets: {
        [key: string]:WidgetPropTypes[]
    }
}