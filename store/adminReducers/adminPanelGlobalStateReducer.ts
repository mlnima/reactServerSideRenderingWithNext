//import {User} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {GET_CUSTOM_PAGES, SET_SIDEBAR_STATUS, SERVER_LOG} from "@store/adminTypes";
import {AnyAction} from 'redux'



const initialState = {
    customPages: [],
    sidebar: false,
    serverLog: [],
    users: [],
    forms: [],
    pages: [],
    metas: [],
    orders: [],
}

export interface AdminPanelGlobalState {
    customPages: string[],
    serverLog: string[],
    sidebar: boolean
}

export const adminPanelGlobalStateReducer = (state = initialState, action:any) => {

    switch (action.type) {
        case GET_CUSTOM_PAGES:
            return {
                ...state,
                customPages: action.payload
            };
        case SET_SIDEBAR_STATUS:
            return {
                ...state,
                sidebar: action.payload
            };
        case SERVER_LOG:
            return {
                ...state,
                serverLog: [...state.serverLog.slice(state.serverLog?.length - 100), action.payload]
            };

        default:
            return state
    }

}