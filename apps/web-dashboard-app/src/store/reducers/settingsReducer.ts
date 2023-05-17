import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosResponse} from "axios";
import {dashboardAPIRequestGetSettings,dashboardAPIRequestUpdateSetting} from "api-requests";
import DefaultPageSettings from "@components/pages/settings/defaultPagesSetttings/DefaultPageSettings";

interface AdminPanelSettingState {
    initialSettings: {},
    pageSettings:{},
    design: {},
    identity: {},
    membershipSettings:{}
    eCommerce: {},
    ip: string,
}

const initialState:AdminPanelSettingState = {
    initialSettings: {},
    pageSettings:{},
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
        try {
            thunkAPI.dispatch(loading(true))
            const settingsRequestData = await dashboardAPIRequestGetSettings(['initialSettings','identity','design','membershipSettings'])
            thunkAPI.dispatch(loading(false))
            return {
                initialSettings: settingsRequestData?.data?.settings?.initialSettings?.data || {},
                design: settingsRequestData?.data?.settings?.design?.data || {},
                identity: settingsRequestData?.data?.settings?.identity?.data|| {},
                membershipSettings: settingsRequestData?.data?.settings?.membershipSettings?.data|| {},
            }

        } catch (err) {
            console.log(err)
        }
    }
)

export const updateSettingAction = createAsyncThunk(
    'adminPanelSettings/updateSetting',
    async ({type,data}:{type:string,data:{}}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        await dashboardAPIRequestUpdateSetting( type,data)
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
        editInitialSettings:(state, action: PayloadAction<any>) => {
            return {
                ...state,
                initialSettings: {
                    ...state.initialSettings,
                    ...action.payload
                }
            };
        },
        editInitialSettingsJson:(state, action: PayloadAction<any>) => {
           state.initialSettings = action.payload
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

export const {editIdentityAction,editDesign,editMembershipSettingsAction,editInitialSettings,editInitialSettingsJson} = settingsSlice.actions

export const settingsReducer = (state: RootState) => state?.settings || null;

export default settingsSlice.reducer