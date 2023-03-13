// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getSettings,getUncachedSettings} from "api-requests";
import {loading} from "./globalStateReducer";

interface SettingsStateRaw {

    //new settings structures
    initialSettings:{},
    currentPageSettings:{},
    ip?: string,
    isSettingSet: boolean,
    adminSettings: {
        [key: string]: {}
    },
    requestedSettings: string[]

    //will be removed
    design: {},
    identity: {},
    eCommerce: {},

}

const initialState: SettingsStateRaw = {
    //new settings structures
    initialSettings:{},
    currentPageSettings:{},
    isSettingSet: false,
    requestedSettings: [],
    //will be removed
    design: {},
    identity: {},
    eCommerce: {},
    adminSettings: {},
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
            let reducedSettings = {}

            for (const setting in (fetchedSettings?.data?.settings || {}) ){
                if (setting === `${config.options.page}Settings`){
                    reducedSettings.currentPageSettings = fetchedSettings?.data?.settings?.[setting]?.data ||{}
                }else {
                    reducedSettings[setting] = fetchedSettings?.data?.settings?.[setting]?.data ||{}
                }
            }
            return {
                ...reducedSettings,
                requestedSettings: config.requireSettings,
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
            // const settingsRequestData = await getUncachedSettings(['identity', 'design', 'adminSettings', 'membershipSettings'])
            const settingsRequestData = await getUncachedSettings(['initialSettings'])
            thunkAPI.dispatch(loading(false))

            return {
                initialSettings:settingsRequestData?.data?.settings?.initialSettings
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

