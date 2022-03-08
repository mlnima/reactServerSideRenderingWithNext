import {AdminPanelPagesTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {ADMIN_GET_PAGES, ADMIN_GET_PAGE} from "@store/adminTypes";

const initialState = {
    pages:[],
    page:{}
}

export const adminPanelPagesReducer = (state: AdminPanelPagesTypes = initialState, action: { type: string, payload: any }) =>{
    switch (action.type) {
        case ADMIN_GET_PAGES:
            return {
                ...state,
                pages: action.payload
            };
        case ADMIN_GET_PAGE:
            return {
                ...state,
                page: action.payload
            };
        default:
            return state
    }
}