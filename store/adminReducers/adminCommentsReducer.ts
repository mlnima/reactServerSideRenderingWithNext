import {
    ADMIN_GET_COMMENTS,
    ADMIN_GET_COMMENT,
    ADMIN_DELETE_COMMENT,
    ADMIN_EDIT_COMMENT,
} from "../adminTypes";
import {AdminPanelCommentsTypes} from "@_variables/TypeScriptTypes/GlobalTypes";


const initialState = {
    comments:[],
    comment:{}
}

// @ts-ignore
export const adminPanelCommentsReducer = (state: AdminPanelCommentsTypes = initialState, action: { type: string, payload: any }) =>{
    switch (action.type) {
        case ADMIN_GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            };
        case ADMIN_GET_COMMENT:
            return {
                ...state,
                comment: action.payload
            };
        default:
            return state
    }
}