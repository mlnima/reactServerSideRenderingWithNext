import {DesignSettings,IdentitySettings,Meta,WidgetPropTypes,MetasPropTypes} from './GlobalTypes'

export interface ClientPagesTypes {
    actor: Meta;
    tag: Meta;
    category: Meta;
    design: DesignSettings;
    identity:IdentitySettings;
    position: string;
    stylesData: string;
    isMobile: boolean;
    referer: boolean ;
    currentPageSidebar:boolean|string;
    widgets: WidgetPropTypes[] | undefined;
    metaSource:MetasPropTypes;
    comments:object[],
    post:object,
    t:any;
    pageInfo:{
        pageStyle:string,
        pageName:string
    },
    responseCode:any
}

export interface _FirstLoadData {
    position: string;
    isMobile: boolean;
    referer: boolean;
    settings?:{
        design: DesignSettings;
        identity: IdentitySettings;
    }[]
}


