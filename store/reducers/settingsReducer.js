import * as types from '../types'
import * as adminTypes from '../types'
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
        case  adminTypes.EDIT_DESIGN:
            return {
                ...state,
                design:{
                    ...state.design,
                    ...action?.payload || {}
                }
            }
        default:
            return state
    }
}