import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";
import Axios from "@_variables/util/Axios";
import {setHeadData} from "@store_toolkit/clientReducers/globalStateReducer";
import _firstRequestHeadDataSetter from "@store_toolkit/_storeVariables/_firstRequestHeadDataSetter";

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


// export const fetchSettings = createAsyncThunk(
//     'settings/fetchSettings',
//     async (config:FetchSettingsProps, thunkAPI) =>{
//
// }
//
// )


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
})

export const {
    setSettingsForAdmin
} = settingsSlice.actions

export const settingsReducer = (state: RootState) => state?.settings || null

export default settingsSlice.reducer

