import * as types from '../types'
import * as adminTypes from '../types'
import {HYDRATE} from 'next-redux-wrapper';
import _ from 'lodash'


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
               ...state,
                widgets : action?.payload
            }
        case adminTypes.SAVE_NEW_WIDGET:

            return {
                ...state,
                widgets:[...state.widgets,action.payload]
            };
        case adminTypes.UPDATE_WIDGET:
            const index = _.findIndex(state.widgets, {_id: action.payload._id});
            const currentWidgets = state.widgets;
            currentWidgets.splice(index,1,action.payload);
            return {
                ...state,
                widgets:currentWidgets
            };
        case adminTypes.DELETE_WIDGET:
            return {
                ...state,
                 widgets:state.widgets.filter(widget=>widget._id !== action.payload)
            };
        default:
            return state
    }
}