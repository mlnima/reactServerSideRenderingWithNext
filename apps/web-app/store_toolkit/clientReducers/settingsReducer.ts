// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getSettings,getUncachedSettings} from "api-requests";
import {loading} from "./globalStateReducer";

interface SettingsStateRaw {
    initialSettings:{},
    currentPageSettings:{},
    isSettingSet: boolean,
    requestedSettings: string[]
}

const initialState: SettingsStateRaw = {
    initialSettings:{},
    currentPageSettings:{},
    isSettingSet: false,
    requestedSettings: [],
}

interface FetchSettingsProps {
    requireSettings: string[],
    options: {
        page?: string
        setHeadData: boolean
    },
    context
}

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (
        config: FetchSettingsProps,
        thunkAPI) => {
        try {
            const fetchedSettings = await getSettings(config.requireSettings);
            return {
                currentPageSettings:fetchedSettings?.data?.settings?.[`${config.options.page}Settings`]?.data || {},
                initialSettings:fetchedSettings?.data?.settings?.initialSettings?.data ||{},
                requestedSettings: config.requireSettings,
                isSettingSet: true,
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export const getUncachedSettingsForAdmin = createAsyncThunk('settings/getUncachedSettingsForAdmin', async (
        config: any,
        thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true))
            const settingsRequestData = await getUncachedSettings([...(config?.requireSettings || []),'initialSettings'])
            thunkAPI.dispatch(loading(false))

            return {
                initialSettings:settingsRequestData?.data?.settings?.initialSettings?.data
            }

        } catch (err) {
            console.log(err)
        }
    }
)

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(fetchSettings.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            }
        })
        .addCase(getUncachedSettingsForAdmin.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            }
        })
})

export const {} = settingsSlice.actions

export const settingsReducer = (state: RootState) => state?.settings || null

export default settingsSlice.reducer

