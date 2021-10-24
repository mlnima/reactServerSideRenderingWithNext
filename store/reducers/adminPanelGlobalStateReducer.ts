import * as types from '../types'


const initialState = {
    customPages:[],
    sidebar:false
}

export interface AdminPanelGlobalState {
    customPages:string[],
    sidebar:boolean
}

export const adminPanelGlobalStateReducer = (state : AdminPanelGlobalState = initialState , action : {type:string,payload:any}) =>{

    switch (action.type){
        case types.GET_CUSTOM_PAGES:
            return {
                ...state,
                customPages:action.payload
            };
        case types.SET_SIDEBAR_STATUS:
            return {
                ...state,
                sidebar:action.payload
            };

        default:
            return state
    }
}