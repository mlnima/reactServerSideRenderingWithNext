import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {GlobalState} from "typescript-types";

const initialState: GlobalState = {
    loginRegisterFormPopup: false,
    loading: false,
    adminMode: false,
    alert: {
        active: false,
        type: null,
        message: ''
    }
}

export const globalStateSlice = createSlice({
    name: 'globalState',
    initialState,
    reducers: {
        loginRegisterForm: (state, action: PayloadAction<any>) => {
            state.loginRegisterFormPopup = action.payload
        },
        setAdminMode: (state, action: PayloadAction<any>) => {
            state.adminMode = action.payload
        },
        loading: (state, action: PayloadAction<any>) => {

            if (state.loading !== action.payload) {
                return {
                    ...state,
                    loading: action.payload
                }
            }
        },
        setLoadingTimeOut: (state, action: PayloadAction<any>) => {
            if (state.loading !== action.payload) {
                state.loading = true
                setTimeout(()=>{
                    state.loading = false
                },action.payload || 3000)
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
})

export const {
    loginRegisterForm,
    loading,
    setLoadingTimeOut,
    setAdminMode,
    setAlert,
    closeAlert
} = globalStateSlice.actions;

export const globalStateReducer = (state: RootState) => state?.globalState || null;

export default globalStateSlice.reducer

