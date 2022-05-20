import {AdminPanelOrdersTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {ADMIN_GET_ORDERS, ADMIN_GET_ORDER} from "../../ZlegacyCodesAndComponents/store/adminTypes";

const initialState = {
    orders:[],
    order:{}
}

export const adminPanelOrdersReducer = (state: AdminPanelOrdersTypes = initialState, action: { type: string, payload: any }) =>{
    switch (action.type) {
        case ADMIN_GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case ADMIN_GET_ORDER:
            return {
                ...state,
                order: action.payload
            };
        default:
            return state
    }
}