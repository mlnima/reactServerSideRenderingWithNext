import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import _reduceWidgetsToGroups from "../../_variables/_reduceWidgetsToGroups/_reduceWidgetsToGroups";
import {WidgetPropTypes} from "@_variables/TypeScriptTypes/Widgets";
import {HYDRATE} from "next-redux-wrapper";
import Axios from "@_variables/util/Axios";
import _getMultipleWidgetWithDataQueryGenerator
    from "@_variables/clientVariables/_getMultipleWidgetWithDataQueryGenerator";
import {loading, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {NextRouter} from "next/router";
import {AxiosResponse} from "axios";

interface WidgetsState {
    widgetInGroups: {
        [key: string]: WidgetPropTypes[]
    },
    requestedWidgets: string[]
}

const initialState: WidgetsState = {
    widgetInGroups: {},
    requestedWidgets: []
}

export const hydrate = createAsyncThunk(
    HYDRATE,
    async (payload) => {
        return payload
    }
)


export const fetchWidgets = createAsyncThunk(
    'widgets/fetchWidgets',
    async (options: { positions: string[], locale: string }, thunkAPI) => {
        const prevStore = thunkAPI.getState()
        // console.log(Object.keys(prevStore.widgets.widgetInGroups))
        // const existingPositions = prevStore?.widgets?.requestedWidgets
        // const differenceWidgets = positions.filter(x => !existingWidgets?.includes(x));

        try {
            const widgets = await Axios.get(`/api/v1/widgets/getMultipleWidgetWithData${_getMultipleWidgetWithDataQueryGenerator(options.positions, options.locale)}`)
            return {
                requestedWidgets: options.positions,
                widgetInGroups: _reduceWidgetsToGroups([...(widgets.data?.widgets || [])])
            }
        } catch (err) {

        }
    }
)

export const saveWidgetFormData = createAsyncThunk(
    'widgets/fetchWidgets',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await Axios.post('/api/v1/forms/saveFormData', {data}).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(true)))
    }
)

export const fetchAdminGetWidgets = createAsyncThunk(
    'adminPanelWidgets/fetchAdminWidgets',
    async (data:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.get(`/api/admin/widgets/adminGetWidgets?token=${localStorage.wt}`)
            .then((res: AxiosResponse<unknown | any>) => {
                return {
                    widgetInGroups: _reduceWidgetsToGroups([...(res?.data?.widgets  || [])])
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
        setRequestedWidgets: (state, action: PayloadAction<any>) => {
            state.requestedWidgets = [...new Set([...state.requestedWidgets, ...action.payload])]
        },
        clearRequestedWidgets: (state, action: PayloadAction<any>) => {
            state.requestedWidgets = []
        },
        setRealTimeWidgetsForAdmin: (state, action: PayloadAction<any>) => {
            console.log(action?.payload)
            return {
                ...state,
                widgetInGroups:  action?.payload || []
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(hydrate.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    requestedWidgets: action.payload?.requestedWidgets,
                    widgetInGroups: action.payload?.widgetInGroups
                };
            })

            .addCase(fetchWidgets.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(fetchAdminGetWidgets.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    widgetInGroups: action.payload?.widgetInGroups
                };
            })
    }
})

export const {setRequestedWidgets, clearRequestedWidgets,setRealTimeWidgetsForAdmin} = widgetsSlice.actions

export const widgetsReducer = (state: RootState) => state?.widgets || null

export default widgetsSlice.reducer


