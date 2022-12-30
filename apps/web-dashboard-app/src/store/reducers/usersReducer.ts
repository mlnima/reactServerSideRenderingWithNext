import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";

import getUsers from "api-requests/src/dashboard/users/getUsers";
import generateNewAPIKey from "api-requests/src/dashboard/users/generateNewAPIKey";
import getUser from "api-requests/src/dashboard/users/getUser";
import updateUser from "api-requests/src/dashboard/users/updateUser";
import deleteUser from "api-requests/src/dashboard/users/deleteUser";
import changePassword from "api-requests/src/dashboard/users/changePassword";
import getSignedInUserData from "api-requests/src/common/users/getSignedInUserData";
import loginUser from "api-requests/src/common/users/loginUser";

const initialState = {
    isUserLoggedIn:false,
    userData: {},
    users: [],
    totalCount: 0,
    user: {}
}

export const loginUserAction = createAsyncThunk(
    'users/loginUserAction',
    async ({username,password}:{username:string,password:string}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

       return await loginUser(username, password).then(response => {
            if (response?.data?.token) {
                localStorage.setItem('wt', response.data.token)

                return {
                    userData: response.data,
                    isUserLoggedIn: true
                }
            }
        }).catch(error => {
            return {
                isUserLoggedIn: false
            }
        }).then(() => {
            thunkAPI.dispatch(loading(false))
        })
    }
)

export const autologinUserAction = createAsyncThunk(
    'users/autologinUserAction',
    async ({fields}:{ fields: string[] }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        if (localStorage.wt) {
            return await getSignedInUserData(fields).then(response => {
                thunkAPI.dispatch(setAlert({message: response.data.message, type: 'success'}))
                return {
                    userData: response.data?.userData,
                    isUserLoggedIn: true
                }
            }).catch((err) => {
                localStorage.removeItem('wt')
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error'}))
            })
        }
    }
)









export const getUsersAction = createAsyncThunk(
    'adminPanelUsers/getUsersAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await getUsers(data).then((res: AxiosResponse<any>) => {
            return {
                users: res.data.users,
                totalCount: res.data.totalCount || 0
            }

        }).catch((error: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminPanelNewAPIKey = createAsyncThunk(
    'adminPanelUsers/fetchAdminPanelNewAPIKey',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await generateNewAPIKey()
            .then(() => {
                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: 'New API KEY Generated'
                }))
            }).catch((error: AxiosError) => {
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

        return await getUser(_id)
            .then(res => {
                return res.data.user
            }).catch((error: AxiosError) => {


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
        return await updateUser(data)
            .then(res => {

            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'success',
                message: 'User Updated'
            }))

        }).catch((error: AxiosError) => {

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
    async ({id, router}: { id: string, router: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            id,
            token: localStorage.wt
        }
        return await deleteUser(id)
            .then(res => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'success',
                message: 'User Deleted'
            }))

        }).catch((error: AxiosError) => {
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

        return await changePassword(oldPass, newPass, newPass2)
            .then((response: AxiosResponse) => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'success',
                message: 'Password Changed'
            }))
        }).catch((error: AxiosError)  => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'error',
                message: 'Can Not Change The Password',
                err:error
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const fetchAdminAutoLogin = createAsyncThunk(
    'user/fetchUserAutoLogin',
    async ({fields}: { fields: string[] }, thunkAPI) => {
        if (localStorage.wt) {
            return await getSignedInUserData(fields)
                .then((response: AxiosResponse) => {
                // console.log(res.data?.userData)
                thunkAPI.dispatch(setAlert({message: response.data.message, type: 'success'}))
                return response.data?.userData
            }).catch((error: AxiosError) => {
                localStorage.removeItem('wt')
                //@ts-ignore
                thunkAPI.dispatch(setAlert({message: error?.response?.data?.message, type: 'error'}))
            })
        } else {
            thunkAPI.dispatch(setAlert({message: 'You Need To Login', type: 'error'}))
        }
    }
)

export const usersSlice = createSlice({
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
            .addCase(loginUserAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(autologinUserAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(getUsersAction.fulfilled, (state, action: PayloadAction<any>) => {
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
            .addCase(fetchAdminAutoLogin.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    userData: action.payload,
                    loggedIn: true
                }
            })
    }
})


export const {adminPanelEditUserData} = usersSlice.actions

export const usersReducer = (state: RootState) => state?.users || null

export default usersSlice.reducer