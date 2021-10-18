import * as types from '../types'

const initialState = {
    customPages:[]
}

export interface AdminPanelGlobalState {
    customPages:string[],
}

export const adminPanelGlobalStateReducer = (state : AdminPanelGlobalState = initialState , action : {type:string,payload:any}) =>{

    switch (action.type){
        case types.GET_CUSTOM_PAGES:
            return {
                ...state,
                customPages:action.payload
            };

        default:
            return state
    }
}