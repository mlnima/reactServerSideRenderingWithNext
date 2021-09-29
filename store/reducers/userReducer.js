import * as types from '../types'


const initialState = {
    userData:{},
    loggedIn:false,
    socketId:null
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
        case  types.GET_SPECIFIC_USER_DATA:
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
        case  types.DISPATCH_SOCKET_ID:
            return {
                ...state,
                socketId:action.payload,
            }
        default:
            return state

    }
}