import {DesignSettings,IdentitySettings,Meta,WidgetPropTypes} from './GlobalTypes'

export interface ClientPagesTypes {
    actor: Meta;
    tag: Meta;
    category: Meta;
    design: DesignSettings;
    identity:IdentitySettings;
    position: string;
    stylesData: string;
    isMobile: boolean;
    referer: boolean;
    currentPageSidebar:boolean|string;
    widgets: WidgetPropTypes[];
}
// position: string,
//     deviceTypeToRender: string,
//     languageToRender: string,
//     metaType: string,
//     viewType: string,
//     type: string,
//     editMode: boolean,
// widgetIndex: Boolean;
// position: string,
//     deviceTypeToRender: string,
//     languageToRender: string,
//     metaType: string,
//     viewType: string,
//     type: string,
//     editMode: boolean,
export interface _FirstLoadData {
    position: string;
    isMobile: boolean;
    referer: boolean;
    settings?:{
        design: DesignSettings;
        identity: IdentitySettings;
    }[]
}


