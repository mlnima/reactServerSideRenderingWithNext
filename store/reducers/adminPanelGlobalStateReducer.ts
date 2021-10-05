import * as types from '../types'
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    customPages:[]
}

export interface AdminPanelGlobalState {
    customPages:string[]
}

export const adminPanelGlobalStateReducer = (state= initialState , action : {type:string,payload:any}) =>{

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