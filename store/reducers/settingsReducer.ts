import {HYDRATE} from 'next-redux-wrapper';
import {SET_SETTINGS} from "../types";
import {EDIT_DESIGN} from "../adminTypes";

const initialState = {
    isMobile: false,
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
                ...action?.payload || {
                    design: process.env.NEXT_PUBLIC_SETTING_DESIGN ? JSON.parse(process.env.NEXT_PUBLIC_SETTING_DESIGN) : {},
                    identity: process.env.NEXT_PUBLIC_SETTING_IDENTITY ? JSON.parse(process.env.NEXT_PUBLIC_SETTING_IDENTITY) : {},
                },
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