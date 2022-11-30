import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
// import Axios from "@_variables/Axios";
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
            // const settingsQuery = config.requireSettings.map((setting) => `setting=${setting}`).join('&')
            // const fetchedSettings = await Axios.get(`/api/v1/settings/getMultipleSettings?${settingsQuery}`)
            // const axiosInstanceTest = await AxiosInstance.get(`/api/v1/settings/getMultipleSettings?${settingsQuery}`)
            // console.log('axiosInstanceTest:',axiosInstanceTest.data)

            const fetchedSettings = await getSettings(config.requireSettings)
            const designData = fetchedSettings.data.settings?.find(setting => setting?.type === 'design')
            const identityData = fetchedSettings.data.settings?.find(setting => setting?.type === 'identity')
            const membershipSettings = fetchedSettings.data.settings?.find(setting => setting?.type === 'membershipSettings')

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
                identity: identityData?.data || {},
                membershipSettings: membershipSettings?.data || {},
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
            // return await Axios.get(`/api/admin/settings/getMultipleSetting${_getMultipleSettingsQueryGenerator(['identity', 'design', 'adminSettings', 'membershipSettings'])}&token=${localStorage.wt}`)

            return await getUncachedSettings(['identity', 'design', 'adminSettings', 'membershipSettings'])
                .then(res => {

                    const designSettings = res.data?.settings?.find((setting: any) => setting?.type === 'design') || {};
                    const identitySettings = res.data?.settings?.find((setting: any) => setting?.type === 'identity') || {};
                    const membershipSettings = res.data?.settings?.find((setting: any) => setting?.type === 'membershipSettings') || {};

                    const settings = {
                        design: designSettings?.data,
                        identity: identitySettings?.data,
                        membershipSettings: membershipSettings?.data,
                    }

                    return settings

                }).catch(() => {

                }).finally(() => thunkAPI.dispatch(loading(false)))
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

