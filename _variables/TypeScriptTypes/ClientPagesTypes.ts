import {DesignSettings,IdentitySettings,Meta,MetasPropTypes} from './GlobalTypes'
import {WidgetPropTypes} from './Widgets'

export interface ClientPagesTypes {
    actor: Meta,
    tag: Meta,
    category: Meta,
    design: DesignSettings,
    identity:IdentitySettings,
    position: string,
    stylesData: string,
    referer: boolean,
    widgets?: WidgetPropTypes[],
    metaSource:MetasPropTypes,
    comments:object[],
    post:object,
    t:any,
    pageInfo:{
        pageStyle:string,
        pageName:string
    },
    responseCode:any
}

export interface _FirstLoadData {
    position: string,
    referer: boolean,
    settings?:{
        design: DesignSettings,
        identity: IdentitySettings,
    }[]
}


