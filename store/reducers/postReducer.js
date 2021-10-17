import * as types from '../types'
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    posts: [],
    actorData: {},
    categoryData: {},
    tagData: {},
    totalCount: 0,
    post: {},
    comments: [],
    categoriesMetas:[],
    tagsMetas:[],
    actorsMetas:[],
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload.posts
            };
        case  types.SET_POSTS_DATA:
            return {
                ...state,
                ...action.payload
            }
        case  types.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                totalCount: action.payload.totalCount,
                loading: false,
                error: null
            }
        case  types.INITIAL_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null
            }
        case  types.GET_POST:
            return {
                ...state,
                ...action.payload,
            }
        case  types.GET_COMMENTS:
            return {
                ...state,
                ...action.payload,
            }
        case  types.NEW_COMMENT:
            const commentsPlusNewComment = [...state.comments, action.payload]
            return {
                ...state,
                comments: commentsPlusNewComment.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
            }
        case  types.DELETE_COMMENT:
            const updatedComments = state.comments.filter(comment => !action.payload.includes(comment._id))
            return {
                ...state,
                comments: updatedComments
            }
        case  types.SET_POST:
            return {
                ...state,
                ...action.payload,
            }
        case  types.SET_CATEGORIES_METAS:
            return {
                ...state,
                ...action.payload,
            }
        case  types.SET_TAGS_METAS:
            return {
                ...state,
                ...action.payload,
            }
        case  types.SET_ACTORS_METAS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state

    }
}