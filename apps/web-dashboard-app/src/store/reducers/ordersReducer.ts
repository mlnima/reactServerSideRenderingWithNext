// @ts-nocheck
import {AdminPanelOrders} from "typescript-types";


const initialState = {
    orders:[],
    order:{}
}

export const ordersReducer = (state: AdminPanelOrders = initialState, action: { type: string, payload: any }) =>{
    switch (action.type) {
        // case ADMIN_GET_ORDERS:
        //     return {
        //         ...state,
        //         orders: action.payload
        //     };
        // case ADMIN_GET_ORDER:
        //     return {
        //         ...state,
        //         order: action.payload
        //     };
        default:
            return state
    }
}