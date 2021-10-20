import * as types from '../types'
import {HYDRATE} from 'next-redux-wrapper';

const initialState = {
    design:{},
    identity:{},
    eCommerce:{},
    adminSettings:{}
}



export const settingsReducer = (state=initialState,action)=>{
    switch (action.type){
        case HYDRATE:
            return {
                ...state,
                ...action.payload?.settings || {}
            };
        case  types.SET_SETTINGS:
            return {
                ...state,
                ...action?.payload || {},
            }
        default:
            return state
    }
}