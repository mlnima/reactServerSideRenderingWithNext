import {
    ADMIN_GET_COMMENTS,
    ADMIN_GET_COMMENT,
    ADMIN_DELETE_COMMENT,
    ADMIN_EDIT_COMMENT,
} from "../adminTypes";
import {AdminPanelCommentsTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {AnyAction} from "redux";


const initialState = {
    comments:[],
    comment:{}
}

// @ts-ignore
export const adminPanelCommentsReducer = (state = initialState, action:AnyAction) =>{
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