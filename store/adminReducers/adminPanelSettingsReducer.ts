//adminPanelSettingsReducer
import {AdminPanelSettingsTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {ADMIN_EDIT_IDENTITY, ADMIN_EDIT_DESIGN, ADMIN_GET_SETTINGS} from "@store/adminTypes";

const initialState = {
    design: {},
    identity: {},
    eCommerce: {},
    isMobile: false,
    ip: '',
}


//@ts-ignore
export const adminPanelSettingsReducer = (state: AdminPanelSettingsTypes = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case ADMIN_EDIT_IDENTITY:
            return {
                ...state,
                identity: {
                    ...state.identity,
                    ...action.payload
                }
            };

        case ADMIN_EDIT_DESIGN:
            return {
                ...state,
                design: {
                    ...state.identity,
                    ...action.payload
                }
            };

        case ADMIN_GET_SETTINGS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}