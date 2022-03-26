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
    SET_TAGS_METAS, LIKE_POST, DISLIKE_POST, VIEW_POST
} from "@store/types";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";

const initialState = {
    posts: [],
    pageData:{},
    actorData: {},
    categoryData: {},
    tagData: {},
    totalCount: 0,
    post: {
        comments:  [],
        likes: 0,
        disLikes: 0,
        views: 0
    },
    relatedPosts: {
        actorsRelatedPosts:[],
        categoriesRelatedPosts:[],
        tagsRelatedPosts:[],
    },
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
                // post:{
                //     ...state.post,
                //     ...action.payload.post
                // },
                // relatedPosts:{
                //     ...action.payload
                // }

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
                ...action.payload

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
                post:{
                    ...state.post,
                    comments: action.payload || []
                }

            }
        case  NEW_COMMENT:
            const commentsPlusNewComment = [...(state.post?.comments || []), action.payload]
            return {
                ...state,
                post:{
                    ...state.post,
                    comments: commentsPlusNewComment.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1) || []
                }
            }
        case  DELETE_COMMENT:
            const updatedComments = (state.post?.comments || []).filter(comment => !action.payload.includes(comment._id))
            return {
                ...state,
                post:{
                    ...state.post,
                    comments: updatedComments
                }
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
        case  LIKE_POST:
            return {
                ...state,
                post:{
                    ...state.post,
                    likes: (state.post?.likes || 0) + 1
                }
            }
        case  DISLIKE_POST:
            return {
                ...state,
                post:{
                    ...state.post,
                    disLikes: (state.post?.disLikes || 0) + 1
                }
            }
        case  VIEW_POST:
            return {
                ...state,
                post:{
                    ...state.post,
                    views: (state.post?.views || 0) + 1
                }
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