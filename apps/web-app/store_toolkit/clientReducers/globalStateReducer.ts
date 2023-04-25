// @ts-nocheck
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {GlobalState} from "typescript-types";
import headerSizeCalculator from "custom-util/src/vanilla-ui-utils/headerSizeCalculator";

const initialState: GlobalState = {
    loginRegisterFormPopup: false,
    loading: false,
    adminMode: false,
    notFoundPage: false,
    headerSize:0,
    headData: {
        allowIndexByRobots:true
    },
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
        getHeaderSizeAction: (state, action: PayloadAction<any>) => {
            state.headerSize = headerSizeCalculator() + action.payload || 0
        },
        loginRegisterForm: (state, action: PayloadAction<any>) => {
            state.loginRegisterFormPopup = action.payload
        },
        setNotFoundPage: (state, action: PayloadAction<any>) => {
            state.notFoundPage = action.payload
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
    setHeadData,
    loginRegisterForm,
    setNotFoundPage,
    getHeaderSizeAction,
    loading,
    setAdminMode,
    setAlert,
    closeAlert
} = globalStateSlice.actions;

export const globalStateReducer = (state: RootState) => state?.globalState || null;

export default globalStateSlice.reducer

