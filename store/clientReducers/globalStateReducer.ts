import {HYDRATE} from 'next-redux-wrapper';
import {CHECK_ROUTE_AND_SET_LOADING, CLOSE_ALERT, LOADING, LOGIN_REGISTER_FORM, SET_ALERT} from "@store/types";

const initialState = {
    loginRegisterFormPopup:false,
    loading:false,
    isSiteIdentitySet:false,
    isSiteDesignSet:false,
    console:false,
    alert:{
        active:false,
        type:null,
        err:null,
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
        case  LOGIN_REGISTER_FORM:
            return {
                ...state,
                loginRegisterFormPopup:action.payload
            };
        case  LOADING:
            return {
                ...state,
                loading:action.payload
            };
        case  SET_ALERT:
            return {
                ...state,
                alert:{
                    active:true,
                    ...action.payload
                }
            };
        case  CLOSE_ALERT:
            return {
                ...state,
                alert:{
                    active:false,
                    type:null,
                    message:''
                }
            };
        case  CHECK_ROUTE_AND_SET_LOADING:
            return {
                ...state,
                loading:action.payload
            };
        default:
            return state
    }
}
