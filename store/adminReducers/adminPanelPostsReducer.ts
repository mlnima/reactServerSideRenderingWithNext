import * as types from '../types'
import * as adminTypes from '../adminTypes'
import {AdminPanelPostsTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "../../_variables/TypeScriptTypes/PostTypes";


const initialState = {
    post: {
        title: '',
        description: ''
    },
    posts:[],
    meta: {},
    metas: [],
    activeEditingLanguage: 'default'
}



// @ts-ignore
export const adminPanelPostsReducer = (state: AdminPanelPostsTypes = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case adminTypes.ADMIN_GET_POST:
            return {
                ...state,
                post: {
                    ...action.payload
                }
            };

        case adminTypes.ADMIN_EDIT_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload
                }
            };

        case adminTypes.ADMIN_GET_META:
            return {
                ...state,
                meta: action.payload
            };
        case adminTypes.ADMIN_GET_METAS:
            return {
                ...state,
                metas: action.payload
            };
        case adminTypes.ADMIN_EDIT_META:
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
        case adminTypes.ADMIN_GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        default:
            return state
    }
}