import * as types from '../types'
import { HYDRATE} from 'next-redux-wrapper';
import {CHECK_ROUTE_AND_SET_LOADING} from "../types";
const initialState = {
    loginRegisterFormPopup:false,
    loading:false,
    isSiteIdentitySet:false,
    isSiteDesignSet:false,
    console:false,
    alert:{
        active:false,
        alertMessage:''
    }
}

export interface State {
    loginRegisterFormPopup:boolean,
    loading:boolean,
    isSiteIdentitySet:boolean,
    isSiteDesignSet:boolean,
    console:boolean,
    alert:{
        active:boolean,
        alertMessage:string
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
        case  types.CHECK_ROUTE_AND_SET_LOADING:
            return {
                ...state,
                loading:action.payload
            };
        default:
            return state
    }
}
