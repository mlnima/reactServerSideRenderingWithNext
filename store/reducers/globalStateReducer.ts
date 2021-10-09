import * as types from '../types'
import {HYDRATE} from 'next-redux-wrapper';


const initialState = {
    loginRegisterFormPopup:false,
    loading:false,
    isSiteIdentitySet:false,
    isSiteDesignSet:false,
    console:false,
    alert:{
        active:false,
        type:null,
        message:''
    }
}



export const globalStateReducer = (state= initialState , action : {type:string,payload:any}) =>{
    switch (action.type){
        case HYDRATE:
            return {
                ...state,
                ...action.payload.globalState
            };
        case  types.LOGIN_REGISTER_FORM:
            return {
                ...state,
                loginRegisterFormPopup:action.payload
            };
        case  types.LOADING:
            return {
                ...state,
                loading:action.payload
            };
        case  types.SET_ALERT:
            return {
                ...state,
                alert:{
                    active:true,
                    ...action.payload
                }
            };
        case  types.CLOSE_ALERT:
            return {
                ...state,
                alert:{
                    active:false,
                    type:null,
                    message:''
                }
            };
        case  types.CHECK_ROUTE_AND_SET_LOADING:
            return {
                ...state,
                loading:action.payload
            };
        default:
            return state
    }
}
