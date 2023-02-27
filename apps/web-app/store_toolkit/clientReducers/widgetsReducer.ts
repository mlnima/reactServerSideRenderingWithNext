// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {reduceWidgetsToGroups} from "custom-util";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosResponse} from "axios";
import {Widget} from "typescript-types";
import getWidgets from "api-requests/src/client/widgets/getWidgets";
import saveFormData from "api-requests/src/client/widgets/saveFormData";
import getUncachedWidgetsForAdmin from "api-requests/src/client/widgets/getUncachedWidgetsForAdmin";

interface WidgetsState {
    widgetInGroups: {
        [key: string]: Widget[]
    },
    requestedWidgets: string[]
}

const initialState: WidgetsState = {
    widgetInGroups: {},
    requestedWidgets: []
}

export const fetchWidgets = createAsyncThunk(
    'widgets/fetchWidgets',
    async (options: { positions: string[], locale: string }, thunkAPI) => {
        try {
            const widgets = await getWidgets(options.positions, options.locale)
            return {
                requestedWidgets: options.positions,
                widgetInGroups: widgets.data?.widgets || {}
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export const saveWidgetFormData = createAsyncThunk(
    'widgets/saveWidgetFormData',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await saveFormData(data).then(response => {
        }).catch(error => {
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const getUncachedWidgetsForAdminAction = createAsyncThunk(
    'adminPanelWidgets/getUncachedWidgetsForAdminAction',
    async (data: any, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true))
            const widgets = await getUncachedWidgetsForAdmin()
            thunkAPI.dispatch(loading(false))
            return {
                widgetInGroups: widgets.data?.widgets || {}
            }
        } catch (error) {

                thunkAPI.dispatch(setAlert({
                    message: 'Error While Getting Widgets',
                    type: 'error',
                    error
                }))
        }
    }
)

export const widgetsSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {

        clearRequestedWidgets: (state, action: PayloadAction<any>) => {
            state.requestedWidgets = []
        },
        setRealTimeWidgetsForAdmin: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                widgetInGroups: action?.payload || []
            };
        }
    },
    extraReducers: (builder) => builder
        .addCase(fetchWidgets.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                requestedWidgets: [...new Set([...(state.requestedWidgets || []), ...(action.payload?.requestedWidgets || [])])],
                widgetInGroups: action.payload?.widgetInGroups

            }
        })
        .addCase(getUncachedWidgetsForAdminAction.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                widgetInGroups: action.payload?.widgetInGroups
            };
        })

})

export const {clearRequestedWidgets, setRealTimeWidgetsForAdmin} = widgetsSlice.actions

export const widgetsReducer = (state: RootState) => state?.widgets || null

export default widgetsSlice.reducer


