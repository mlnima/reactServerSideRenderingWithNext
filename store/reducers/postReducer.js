import * as types from '../types'

const initialState = {
    posts:[],
    totalCount:0,
    loading:false,
    error:null
}

export const postReducer = (state=initialState,action)=>{
    switch (action.type){
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
        default:
            return state

    }
}