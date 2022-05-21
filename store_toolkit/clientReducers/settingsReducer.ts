import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";
import {HYDRATE} from "next-redux-wrapper";
import Axios from "@_variables/util/Axios";

import {setHeadData} from "@store_toolkit/clientReducers/globalStateReducer";
import _firstRequestHeadDataSetter from "@store_toolkit/_clientVariables/_firstRequestHeadDataSetter";

interface SettingsStateState {
    isMobile: boolean,
    design: {},
    identity: {},
    eCommerce: {},
    adminSettings: {
        [key: string]: {}
    },
    requestedSettings: string[]
}

const initialState: SettingsStateState = {
    isMobile: true,
    design: {},
    identity: {},
    eCommerce: {},
    adminSettings: {},
    requestedSettings: []
}

interface FetchSettingsProps{
    requireSettings: string[],
    options:{
        page?:string
        setHeadData:boolean
    },
    context
}

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (
        config:FetchSettingsProps,
        thunkAPI) => {

        try {
            // const prevStore = await thunkAPI.getState()
            // console.log('_______________________________________________________________________________________')
            // console.log(prevStore?.settings?.requestedSettings)
            // console.log(prevStore?.widgets?.requestedWidgets)

            // const prevStore = await thunkAPI.getState()
            // console.log(prevStore.user)
            // const existingSettings = prevStore?.settings?.requestedSettings || [];
            // const differenceSettings =  config.requireSettings.filter(x => !existingSettings?.includes(x));
            //
            // console.log('prevStore :', prevStore.user.userData)
            // console.log('existingSettings :', existingSettings)
            // console.log('requireSettings :', config.requireSettings)
            // console.log('differenceSettings :', differenceSettings)

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
            // setHeadData(_firstRequestHeadDataSetter(config.context, config.options?.page, config.options?.setHeadData, identityData.data))
            return {
                requestedSettings: config.requireSettings,
                design: designData?.data || {},
                identity: identityData.data || {},
            }
        }catch (err) {
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
        setRequestedSettings: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                requestedSettings: [...new Set([...state.requestedSettings, ...action.payload])]
            }
        },
        clearRequestedSettings: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                requestedSettings: []
            }
        },
        editDesign: (state, action: PayloadAction<any>) => {
            // state.design = action?.payload || null
            // return {
            //     ...state,
            //     design: {
            //         ...state.design,
            //         ...action?.payload || {}
            //     }
            // }
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

export const {setRequestedSettings, editDesign} = settingsSlice.actions

export const settingsReducer = (state: RootState) => state?.settings || null

export default settingsSlice.reducer

