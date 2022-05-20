import {AxiosErrorTypes, User} from "@_variables/TypeScriptTypes/GlobalTypes";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import Axios from "@_variables/util/Axios";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "@store_toolkit/store";
import {NextRouter} from "next/router";


const initialState = {
    users: [],
    totalCount: 0,
    user: {}
}

export interface AdminPanelUsersState {
    totalCount: number;
    users: User[];
    user: User
}

// //@ts-ignore
// export const adminPanelUsersReducer = (state: AdminPanelUsersState = initialState, action: { type: string, payload: any }) => {
//     switch (action.type) {
//         case ADMIN_GET_USERS:
//             return {
//                 ...state,
//                 users: action.payload.users,
//                 totalCount: action.payload.totalCount
//             };
//         case ADMIN_GET_USER:
//             return {
//                 ...state,
//                 user: action.payload
//             };
//         case ADMIN_EDIT_USER_DATA:
//             return {
//                 ...state,
//                 user: {
//                     ...state.user,
//                     ...action.payload
//                 }
//             };
//         default:
//             return state
//     }
// }

export const fetchAdminPanelUsers = createAsyncThunk(
    'adminPanelUsers/fetchAdminPanelUsers',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            data,
            token: localStorage.wt
        };
        return await Axios.post('/api/admin/users/getUsersList', body).then((res: AxiosResponse<any>) => {
            return {
                users: res.data.users,
                totalCount: res.data.totalCount || 0
            }

        }).catch((err: AxiosError<AxiosErrorTypes>) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminPanelNewAPIKey = createAsyncThunk(
    'adminPanelUsers/fetchAdminPanelNewAPIKey',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.post('/api/admin/users/newAPIKey', {token: localStorage.wt})
            .then(() => {
                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: 'New API KEY Generated'
                }))
            }).catch(() => {
                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'error',
                    message: 'Something Went Wrong'
                }))
            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminPanelUserData = createAsyncThunk(
    'adminPanelUsers/fetchAdminPanelUserData',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            _id,
            token: localStorage.wt
        }
        return await Axios.post('/api/admin/users/getUser', body)
            .then(res => {
                console.log(res.data.user)
                return res.data.user
            }).catch(err => {


                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'error',
                    message: 'Can Not Get User Data'
                }))
            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminPanelUpdateUserData = createAsyncThunk(
    'adminPanelUsers/fetchAdminPanelUpdateUserData',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            data,
            token: localStorage.wt
        }
        return await Axios.post('/api/v1/users/updateUserData', body).then(res => {

            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'success',
                message: 'User Updated'
            }))

        }).catch(err => {

            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'error',
                message: 'Can Not Get User Data'
            }))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchAdminPanelDeleteUser = createAsyncThunk(
    'adminPanelUsers/fetchAdminPanelDeleteUser',
    async ({id, router}: { id: string, router: NextRouter }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            id,
            token: localStorage.wt
        }
        return await Axios.post('/api/admin/users/deleteUser', body).then(res => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'success',
                message: 'User Deleted'
            }))

        }).catch(err => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'error',
                message: 'Can Not Delete User'
            }))

        }).finally(() => {
            thunkAPI.dispatch(loading(false))
            router.back()
        })
    }
)
export const fetchAdminPanelChangePassword = createAsyncThunk(
    'adminPanelUsers/fetchAdminPanelChangePassword',
    async ({oldPass, newPass, newPass2}: { oldPass: string, newPass: string, newPass2: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        let body = {
            oldPass,
            newPass,
            newPass2,
            token: localStorage.wt
        }
        return await Axios.post('/api/v1/users/resetPassword', body).then(res => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'success',
                message: 'Password Changed'
            }))
        }).catch(err => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'error',
                message: 'Can Not Change The Password'
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const adminPanelUsersSlice = createSlice({
    name: 'adminPanelUsers',
    initialState,
    reducers: {
        adminPanelEditUserData: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminPanelUsers.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    users: action.payload.users,
                    totalCount: action.payload.totalCount
                };
            })
            .addCase(fetchAdminPanelUserData.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    user: action.payload
                };
            })
    }
})


export const {adminPanelEditUserData} = adminPanelUsersSlice.actions

export const adminPanelUsersReducer = (state: RootState) => state?.adminPanelUsers || null

export default adminPanelUsersSlice.reducer