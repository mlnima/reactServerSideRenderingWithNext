import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {GlobalStateTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const initialState: GlobalStateTypes = {
    loginRegisterFormPopup: false,
    beforeUnload: false,
    loading: false,
    notFoundPage: false,
    isSiteIdentitySet: false,
    isSiteDesignSet: false,
    console: false,
    headData: {},
    alert: {
        active: false,
        type: null,
        err: null,
        message: ''
    }
}

export const globalStateSlice = createSlice({
    name: 'globalState',
    initialState,
    reducers: {

        setHeadData: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                headData: {
                    ...state.headData,
                    ...action.payload
                }
            }
        },
        loginRegisterForm: (state, action: PayloadAction<any>) => {
            state.loginRegisterFormPopup = action.payload
        },
        setNotFoundPage: (state, action: PayloadAction<any>) => {
            state.notFoundPage = action.payload
        },
        loading: (state, action: PayloadAction<any>) => {

            if(state.loading !== action.payload){
                return{
                    ...state,
                    loading:action.payload
                }
            }
        },
        setAlert: (state, action: PayloadAction<any>) => {
            state.alert = {
                ...action.payload,
                active: true,
            }
        },
        closeAlert: (state, action: PayloadAction<any>) => {
            state.alert = {
                active: false,
                type: null,
                message: ''
            }
        }
    },
    // extraReducers: {
    //     [HYDRATE]: (state, action: PayloadAction<any>) => {
    //         return {
    //             ...state,
    //             ...action.payload.globalState
    //         };
    //     }
    // }
})


export const {
    setHeadData,
    loginRegisterForm,
    setNotFoundPage,
    loading,
    setAlert,
    closeAlert
} = globalStateSlice.actions;

export const globalStateReducer = (state: RootState) => state?.globalState || null;

export default globalStateSlice.reducer

//PER6-9NG1-YDCN-GDT6