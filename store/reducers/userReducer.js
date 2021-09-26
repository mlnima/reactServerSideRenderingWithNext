import * as types from '../types'

const initialState = {
    userData:{},
    loggedIn:false,
    loading:false,
    error:null
}

export const userReducer = (state=initialState,action)=>{
    switch (action.type){
        case  types.AUTO_LOGIN:
            return {
                ...state,
                userData:action.payload.userData,
                loggedIn:action.payload.loggedIn,
                error:null
            }
        case  types.LOGIN:
            return {
                ...state,
                userData:action.payload.userData,
                loggedIn:action.payload.loggedIn,
                loading:false,
                error:null
            }
        case  types.LOGOUT:
            return {
                ...state,
                userData:{},
                loggedIn:false,
                loading:false,
                error:null
            }
        default:
            return state

    }
}