import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {loading, setAlert} from "../clientReducers/globalStateReducer";
import {AxiosResponse} from "axios";
import {setSettingsForAdmin} from "../clientReducers/settingsReducer";
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
export const adminPanelGetSettings = createAsyncThunk(
    'adminPanelSettings/adminPanelGetSettings',
    async (data:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
      //  return await Axios.get(`/api/admin/settings/getMultipleSetting${_getMultipleSettingsQueryGenerator(['identity', 'design', 'adminSettings','membershipSettings'])}&token=${localStorage.wt}`)
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

                thunkAPI.dispatch(setSettingsForAdmin(settings))

                return settings

            }).catch(() => {

            }).finally(() =>      thunkAPI.dispatch(loading(false)))
    }
)

export const adminPanelUpdateSetting = createAsyncThunk(
    'adminPanelSettings/adminPanelUpdateSetting',
    async ({type,data}:{type:string,data:{}}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            type,
            data,
            token: localStorage.wt,
        };
        await updateSetting( type,data)
            .then((res: AxiosResponse<any>) => {

            thunkAPI.dispatch(setAlert({message: res.data.message || 'updated', type: 'success'}))
        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response.data.message || 'Something Went Wrong', type: 'error', err}))

        }).finally(()=> thunkAPI.dispatch(loading(false)))
    }
)




export const adminPanelSettingsSlice = createSlice({
    name:'adminPanelSettings',
    initialState,
    reducers:{
        adminEditMembershipSettings:(state, action: PayloadAction<any>) => {
            return {
                ...state,
                membershipSettings: {
                    ...state.membershipSettings,
                    ...action.payload
                }
            };
        },
        adminEditIdentity:(state, action: PayloadAction<any>) => {
            return {
                ...state,
                identity: {
                    ...state.identity,
                    ...action.payload
                }
            };
        },
        adminEditDesign:(state, action: PayloadAction<any>) => {
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
        builder.addCase(adminPanelGetSettings.fulfilled,(state, action: PayloadAction<any>) =>{
            return {
                ...state,
                ...action.payload
            };
        })
    }
})

export const {adminEditIdentity,adminEditDesign,adminEditMembershipSettings} = adminPanelSettingsSlice.actions

export const adminPanelSettingsReducer = (state: RootState) => state?.adminPanelSettings || null;

export default adminPanelSettingsSlice.reducer