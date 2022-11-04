import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {reduceWidgetsToGroups} from "custom-util";
import Axios from "@_variables/Axios";
import _getMultipleWidgetWithDataQueryGenerator
    from "@_variables/_clientVariables/clientVariables/_getMultipleWidgetWithDataQueryGenerator";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosResponse} from "axios";
import {Widget} from "typescript-types";


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
            // console.log('Axios.defaults.baseURL : ',Axios.defaults.baseURL)
            const widgets = await Axios.get(`/api/v1/widgets/getMultipleWidgetWithData${_getMultipleWidgetWithDataQueryGenerator(options.positions, options.locale)}`)

            return {
                requestedWidgets: options.positions,
                widgetInGroups: reduceWidgetsToGroups([...(widgets.data?.widgets || [])])
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

        return await Axios.post('/api/v1/forms/saveFormData', {data}).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(true)))
    }
)

export const getUncachedWidgetsForAdmin = createAsyncThunk(
    'adminPanelWidgets/getUncachedWidgetsForAdmin',
    async (data:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.get(`/api/admin/widgets/adminGetWidgets?token=${localStorage.wt}`)
            .then((res: AxiosResponse<unknown | any>) => {
                return {
                    widgetInGroups: reduceWidgetsToGroups([...(res?.data?.widgets  || [])])
                }
            }).catch(err => {
                thunkAPI.dispatch(setAlert({
                    message: 'Error While Getting Widgets',
                    type: 'error',
                    err
                }))
            }).finally(()=>thunkAPI.dispatch(loading(false)))
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
                widgetInGroups:  action?.payload || []
            };
        }
    },
    extraReducers: (builder) => builder
            .addCase(fetchWidgets.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    requestedWidgets: [...new Set([...(state.requestedWidgets || []),...(action.payload?.requestedWidgets || [])])],
                    widgetInGroups:action.payload?.widgetInGroups

                }
            })
            .addCase(getUncachedWidgetsForAdmin.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    widgetInGroups: action.payload?.widgetInGroups
                };
            })

})

export const { clearRequestedWidgets,setRealTimeWidgetsForAdmin} = widgetsSlice.actions

export const widgetsReducer = (state: RootState) => state?.widgets || null

export default widgetsSlice.reducer


