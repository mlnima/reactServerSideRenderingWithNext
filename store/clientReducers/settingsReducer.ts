import {HYDRATE} from 'next-redux-wrapper';
import {SET_SETTINGS,GET_SETTINGS} from "../types";
import {EDIT_DESIGN} from "../adminTypes";

const initialState = {
    isMobile: true,
    design:  {},
    identity: {},
    eCommerce: {},
    adminSettings: {}
}

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload?.settings || {}
            };
        case SET_SETTINGS:
            return {
                ...state,
                ...action?.payload
            }
        case GET_SETTINGS:
            return {
                ...state,
                ...action?.payload
            }
        case  EDIT_DESIGN:
            return {
                ...state,
                design: {
                    ...state.design,
                    ...action?.payload || {}
                }
            }
        default:
            return state
    }
}