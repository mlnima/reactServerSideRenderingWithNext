import * as types from '../types'
import {HYDRATE} from 'next-redux-wrapper';

const initialState = {
    widgets:[]
}

export const widgetsReducer = (state=initialState,action)=>{

    switch (action.type){
        case HYDRATE:
            return {
                ...state,
                ...action?.payload?.widgets || []
            };
        case  types.SET_WIDGETS:
            return{
                ...state,
                widgets : action?.payload
            }
        case  types.SET_WIDGETS_FOR_ADMIN:
            return{
               // ...state,
                widgets : action?.payload
            }
        default:
            return state
    }
}