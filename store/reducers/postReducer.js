import * as types from '../types'
import {GET_COMMENTS, GET_POST} from "../types";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    posts:[],
    totalCount:0,
    post:{},
    comments:[],
    loading:false,
    error:null
}

export const postReducer = (state=initialState,action)=>{
    switch (action.type){
        case HYDRATE:
            return {
                ...state,
                ...action.payload.posts
            };
        case  types.GET_POSTS:
            return {
                ...state,
                posts:action.payload.posts,
                totalCount:action.payload.totalCount,
                loading:false,
                error:null
            }
        case  types.INITIAL_POSTS:
            return {
                ...state,
                posts:action.payload,
                loading:false,
                error:null
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
        case  types.SET_POST:

            return {
                ...state,
                ...action.payload,

            }
        default:
            return state

    }
}