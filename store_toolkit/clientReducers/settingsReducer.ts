import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";
import Axios from "@_variables/util/Axios";
import {loading, setHeadData} from "@store_toolkit/clientReducers/globalStateReducer";
import _firstRequestHeadDataSetter from "@store_toolkit/_storeVariables/_firstRequestHeadDataSetter";
import _getMultipleSettingsQueryGenerator from "@_variables/adminVariables/_getMultipleSettingsQueryGenerator";

interface SettingsStateRaw {
    ip?: string,
    isSettingSet:boolean,
    design: {},
    identity: {},
    eCommerce: {},
    adminSettings: {
        [key: string]: {}
    },
    requestedSettings: string[]
}

const initialState: SettingsStateRaw = {
    isSettingSet:false,
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
            const settingsQuery = config.requireSettings.map((setting) => `setting=${setting}`).join('&')
            const fetchedSettings = await Axios.get(`/api/v1/settings/getMultipleSettings?${settingsQuery}`)
            const designData = fetchedSettings.data.settings?.find(setting => setting.type === 'design')
            const identityData = fetchedSettings.data.settings?.find(setting => setting.type === 'identity')

            thunkAPI.dispatch(
                setHeadData(
                    _firstRequestHeadDataSetter(
                        config.context,
                        config.options?.page,
                        config.options?.setHeadData,
                        identityData.data
                    )
                )
            )
            return {
                requestedSettings: config.requireSettings,
                design: designData?.data || {},
                identity: identityData.data || {},
                isSettingSet:true,
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
            return await Axios.get(`/api/admin/settings/getMultipleSetting${_getMultipleSettingsQueryGenerator(['identity', 'design', 'adminSettings'])}&token=${localStorage.wt}`)
                .then(res => {

                    const designSettings = res.data?.settings?.find((setting: any) => setting.type === 'design') || {};
                    const identitySettings = res.data?.settings?.find((setting: any) => setting.type === 'identity') || {};

                    const settings = {
                        design: designSettings?.data,
                        identity: identitySettings?.data,
                    }

                    return settings

                }).catch(() => {

                }).finally(() =>      thunkAPI.dispatch(loading(false)))
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

