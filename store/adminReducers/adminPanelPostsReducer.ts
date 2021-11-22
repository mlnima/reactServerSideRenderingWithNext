import * as types from '../types'
import {AdminPanelPostsTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";


const initialState = {
    post: {
        title: '',
        description: ''
    },
    meta: {},
    activeEditingLanguage: 'default'
}

// @ts-ignore
export const adminPanelPostsReducer = (state: AdminPanelPostsTypes = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case types.ADMIN_GET_POST:
            return {
                ...state,
                post: {
                    ...action.payload
                }
            };

        case types.ADMIN_EDIT_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload
                }
            };

        case types.ADMIN_GET_META:
            return {
                ...state,
                meta: action.payload
            };
        case types.ADMIN_EDIT_META:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    ...action.payload
                }
            };
        case types.CHANGE_ACTIVE_EDITING_LANGUAGE:
            return {
                ...state,
                activeEditingLanguage: action.payload
            };

        case types.NEW_POST:
            return {
                ...state,
                activeEditingLanguage: 'default',
                post: action.payload
            };

        default:
            return state
    }
}