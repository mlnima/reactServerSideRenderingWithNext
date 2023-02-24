// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getSettings,getUncachedSettings} from "api-requests";
import {loading, setHeadData} from "./globalStateReducer";
import _firstRequestHeadDataSetter from "../_storeVariables/_firstRequestHeadDataSetter";
// import _getMultipleSettingsQueryGenerator from "@_variables/adminVariables/_getMultipleSettingsQueryGenerator";

interface SettingsStateRaw {
    ip?: string,
    isSettingSet: boolean,
    design: {},
    identity: {},
    eCommerce: {},
    adminSettings: {
        [key: string]: {}
    },
    requestedSettings: string[]
}

const initialState: SettingsStateRaw = {
    isSettingSet: false,
    design: {},
    identity: {},
    eCommerce: {},
    adminSettings: {},
    requestedSettings: []
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
            const fetchedSettings = await getSettings(config.requireSettings)

            thunkAPI.dispatch(
                setHeadData(
                    _firstRequestHeadDataSetter(
                        config.context,
                        config.options?.page,
                        config.options?.setHeadData,
                        // identityData.data
                        fetchedSettings.data?.settings?.identity?.data
                    )
                )
            )
            return {
                requestedSettings: config.requireSettings,
                design: fetchedSettings.data?.settings?.design?.data || {},
                identity: fetchedSettings.data?.settings?.identity?.data || {},
                membershipSettings: fetchedSettings.data?.settings?.membershipSettings?.data  || {},
                isSettingSet: true,
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export const getUncachedSettingsForAdmin = createAsyncThunk('settings/getUncachedSettingsForAdmin', async (
        data: any,
        thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true))
            const settingsRequestData = await getUncachedSettings(['identity', 'design', 'adminSettings', 'membershipSettings'])
            thunkAPI.dispatch(loading(false))

            return {
                design: settingsRequestData?.data?.settings?.design?.data || {},
                identity: settingsRequestData?.data?.settings?.identity?.data|| {},
                membershipSettings: settingsRequestData?.data?.settings?.membershipSettings?.data|| {},
            }

        } catch (err) {
            console.log(err)
        }
    }
)

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettingsForAdmin: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            }
        },
    },
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

export const {
    setSettingsForAdmin
} = settingsSlice.actions

export const settingsReducer = (state: RootState) => state?.settings || null

export default settingsSlice.reducer

