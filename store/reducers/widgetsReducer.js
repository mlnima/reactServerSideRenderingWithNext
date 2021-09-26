import * as types from '../types'


const initialState = {
    widgets:[],
    loading:false,
    error:null
}

export const widgetsReducer = (state=initialState,action)=>{

    switch (action.type){
        case  types.SET_WIDGETS:
            return {
                ...state,
                widgets:action.payload,
                error:null
            }
        default:
            return state
    }
}