import * as types from '../types'

const initialState = {
    loginRegisterFormPopup:false,
    loading:false
}

export const globalStateReducer = (state=initialState, action) =>{
    switch (action.type){
        case  types.LOGIN_REGISTER_FORM:
            return {
                ...state,
                loginRegisterFormPopup:action.payload
            }
        case  types.LOADING:
            return {
                ...state,
                loading:action.payload
            }
        default:
            return state
    }
}
