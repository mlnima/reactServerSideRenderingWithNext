import {AdminPanelPostsTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

import {
    ADMIN_EDIT_META,
    ADMIN_EDIT_POST,
    ADMIN_GET_META,
    ADMIN_GET_METAS,
    ADMIN_GET_POST, ADMIN_GET_POSTS,
    ADMIN_SET_TOTAL_COUNT
} from "../adminTypes";

import {CHANGE_ACTIVE_EDITING_LANGUAGE, NEW_POST} from "@store/types";

const initialState = {
    post: {
        title: '',
        description: ''
    },
    totalCount:0,
    posts:[],
    meta: {},
    metas: [],
    activeEditingLanguage: 'default'
}

// @ts-ignore
export const adminPanelPostsReducer = (state: AdminPanelPostsTypes = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case ADMIN_GET_POST:
            return {
                ...state,
                post: {
                    ...action.payload
                }
            };

        case ADMIN_EDIT_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload
                }
            };

        case ADMIN_GET_META:
            return {
                ...state,
                meta: action.payload
            };
        case ADMIN_GET_METAS:
            return {
                ...state,
                metas: action.payload
            };
        case ADMIN_EDIT_META:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    ...action.payload
                }
            };
        case CHANGE_ACTIVE_EDITING_LANGUAGE:
            return {
                ...state,
                activeEditingLanguage: action.payload
            };

        case NEW_POST:
            return {
                ...state,
                activeEditingLanguage: 'default',
                post: action.payload
            };
        case ADMIN_GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case ADMIN_SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            };
        default:
            return state
    }
}