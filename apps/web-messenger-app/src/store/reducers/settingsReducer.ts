import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosResponse} from "axios";
import getMultipleSetting from "api-requests/src/dashboard/settings/getMultipleSetting";
import updateSetting from "api-requests/src/dashboard/settings/updateSetting";

interface AdminPanelSettingState {
    design: {},
    identity: {},
    membershipSettings:{}
    eCommerce: {},
    ip: string,
}

const initialState:AdminPanelSettingState = {
    design: {},
    identity: {},
    membershipSettings:{},
    eCommerce: {},
    ip: '',
}

//need to add data to client reducer as well to have updated settings in admin browsing mode
export const getSettingsAction = createAsyncThunk(
    'adminPanelSettings/adminPanelGetSettings',
    async (data:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return getMultipleSetting()
            .then(res => {

                const designSettings = res.data?.settings?.find((setting: any) => setting.type === 'design') || {};
                const identitySettings = res.data?.settings?.find((setting: any) => setting.type === 'identity') || {};
                const membershipSettings = res.data?.settings?.find((setting: any) => setting.type === 'membershipSettings') || {};

                const settings = {
                    design: designSettings?.data,
                    identity: identitySettings?.data,
                    membershipSettings: membershipSettings?.data,
                }

                // thunkAPI.dispatch(setSettingsForAdmin(settings))

                return settings

            }).catch(() => {

            }).finally(() =>      thunkAPI.dispatch(loading(false)))
    }
)

export const updateSettingAction = createAsyncThunk(
    'adminPanelSettings/updateSetting',
    async ({type,data}:{type:string,data:{}}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        await updateSetting( type,data)
            .then((res: AxiosResponse<any>) => {

            thunkAPI.dispatch(setAlert({message: res.data.message || 'updated', type: 'success'}))
        }).catch(error => {
            thunkAPI.dispatch(setAlert({message: error.response.data.message || 'Something Went Wrong', type: 'error', err:error}))

        }).finally(()=> thunkAPI.dispatch(loading(false)))
    }
)




export const settingsSlice = createSlice({
    name:'adminPanelSettings',
    initialState,
    reducers:{
       editMembershipSettingsAction:(state, action: PayloadAction<any>) => {
            return {
                ...state,
                membershipSettings: {
                    ...state.membershipSettings,
                    ...action.payload
                }
            };
        },
        editIdentityAction:(state, action: PayloadAction<any>) => {
            return {
                ...state,
                identity: {
                    ...state.identity,
                    ...action.payload
                }
            };
        },
        editDesign:(state, action: PayloadAction<any>) => {
            return {
                ...state,
                design: {
                    ...state.design,
                    ...action.payload
                }
            };
        },


    },
    extraReducers:(builder )=> {
        builder.addCase(getSettingsAction.fulfilled,(state, action: PayloadAction<any>) =>{
            return {
                ...state,
                ...action.payload
            };
        })
    }
})

export const {editIdentityAction,editDesign,editMembershipSettingsAction} = settingsSlice.actions

export const settingsReducer = (state: RootState) => state?.settings || null;

export default settingsSlice.reducer