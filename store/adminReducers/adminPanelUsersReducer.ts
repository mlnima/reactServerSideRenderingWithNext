import {ADMIN_EDIT_USER_DATA, ADMIN_GET_USER, ADMIN_GET_USERS} from "@store/adminTypes";
import {User} from "@_variables/TypeScriptTypes/GlobalTypes";


const initialState = {
    users: [],
    totalCount: 0,
    user: {}
}

export interface AdminPanelUsersState {
    totalCount: number;
    users: User[];
    user: User
}
//@ts-ignore
export const adminPanelUsersReducer = (state: AdminPanelUsersState = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case ADMIN_GET_USERS:
            return {
                ...state,
                users: action.payload.users,
                totalCount: action.payload.totalCount
            };
        case ADMIN_GET_USER:
            return {
                ...state,
                user: action.payload
            };
        case ADMIN_EDIT_USER_DATA:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        default:
            return state
    }
}