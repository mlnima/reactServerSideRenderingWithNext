//adminUsersReducer

import * as adminTypes from "../adminTypes";

const initialState = {
    users: [],
    user: {}
}

export interface AdminPanelUsersState {
    users: any[];
    user:{}
}

export const adminPanelUsersReducer = (state: AdminPanelUsersState = initialState, action: { type: string, payload: any }) => {
    switch (action.type){
        case adminTypes.ADMIN_GET_USERS:
            return {
                ...state,
                users:action.payload
            };
        case adminTypes.ADMIN_GET_USER:
            return {
                ...state,
                user:action.payload
            };
        default:
            return state
    }
}