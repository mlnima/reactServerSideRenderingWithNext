import {AdminPanelFormsTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {ADMIN_GET_FORMS, ADMIN_GET_FORM} from "@store/adminTypes";

const initialState = {
    forms:[],
    form:{}
}


export const adminPanelFormsReducer = (state: AdminPanelFormsTypes = initialState, action: { type: string, payload: any }) =>{
    switch (action.type) {
        case ADMIN_GET_FORMS:
            return {
                ...state,
                forms: action.payload
            };
        case ADMIN_GET_FORM:
            return {
                ...state,
                form: action.payload
            };
        default:
            return state
    }
}