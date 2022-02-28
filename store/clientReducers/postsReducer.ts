import {HYDRATE} from "next-redux-wrapper";
import {
    DELETE_COMMENT,
    GET_COMMENTS,
    GET_EDITING_POST,
    GET_METAS,
    GET_PAGE_DATA,
    GET_POST,
    GET_POSTS,
    INITIAL_POSTS,
    EDIT_POST_FIELD,
    NEW_COMMENT,
    SET_ACTORS_METAS,
    SET_CATEGORIES_METAS,
    SET_POST,
    SET_POSTS_DATA,
    SET_TAGS_METAS
} from "@store/types";

const initialState = {
    posts: [],
    pageData:{},
    actorData: {},
    categoryData: {},
    tagData: {},
    totalCount: 0,
    post: {},
    editingPost:{},
    comments: [],
    categoriesMetas:[],
    tagsMetas:[],
    actorsMetas:[],
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload.posts
            };
        case  SET_POSTS_DATA:
            return {
                ...state,
                ...action.payload
            }
        case  GET_POSTS:
            return {
                ...state,
                ...action.payload
            }
        case  INITIAL_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null
            }
        case  GET_POST:
            return {
                ...state,
                post: action.payload,
            }
        case  GET_EDITING_POST:
            return {
                ...state,
                editingPost : action.payload
            }
        case  EDIT_POST_FIELD:
            return {
                ...state,
                editingPost:{
                    ...state.editingPost,
                    ...action.payload
                }
            }
        case  GET_COMMENTS:
            return {
                ...state,
                comments:action.payload,
            }
        case  NEW_COMMENT:
            const commentsPlusNewComment = [...state.comments, action.payload]
            return {
                ...state,
                comments: commentsPlusNewComment.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
            }
        case  DELETE_COMMENT:
            const updatedComments = state.comments.filter(comment => !action.payload.includes(comment._id))
            return {
                ...state,
                comments: updatedComments
            }
        case  SET_POST:
            return {
                ...state,
                ...action.payload,
            }
        case  GET_METAS:
            return {
                ...state,
                ...action.payload,
            }
        case  SET_CATEGORIES_METAS:
            return {
                ...state,
                ...action.payload,
            }
        case  SET_TAGS_METAS:
            return {
                ...state,
                ...action.payload,
            }
        case  SET_ACTORS_METAS:
            return {
                ...state,
                ...action.payload,
            }
        case  GET_PAGE_DATA:
            return {
                ...state,
                pageData:action.payload
            }
        default:
            return state

    }
}