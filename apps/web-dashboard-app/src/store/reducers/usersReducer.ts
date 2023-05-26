// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import {
    dashboardAPIRequestGetUsers,
    dashboardAPIRequestGenerateNewAPIKey,
    dashboardAPIRequestUpdateUser,
    dashboardAPIRequestDeleteUser,
    dashboardAPIRequestChangePassword,
    commonAPIRequestGetSignedInUserData,
    commonAPIRequestLoginUser,
    dashboardAPIRequestGetUser
} from "api-requests";


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

       return await commonAPIRequestLoginUser(username, password).then(response => {
            if (response?.data?.token && response.data.userData.role === 'administrator' ) {
                localStorage.setItem('wt', response.data.token.toString())


                return {
                    userData: response.data.userData,
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
            return await commonAPIRequestGetSignedInUserData(fields).then(response => {

                if ( response.data.userData.role === 'administrator' ) {

                    thunkAPI.dispatch(setAlert({message: response.data.message, type: 'success'}))
                    return {
                        userData: response.data?.userData,
                        isUserLoggedIn: true
                    }
                }
                thunkAPI.dispatch(setAlert({message: 'forbidden', type: 'error'}))
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

        return await dashboardAPIRequestGetUsers(data).then((res: AxiosResponse<any>) => {
            return {
                users: res.data.users,
                totalCount: res.data.totalCount || 0
            }

        }).catch((error: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const generateNewAPIKeyAction = createAsyncThunk(
    'adminPanelUsers/generateNewAPIKeyAction',
    async (data:null, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await dashboardAPIRequestGenerateNewAPIKey()
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

export const getUserDataAction = createAsyncThunk(
    'adminPanelUsers/getUserDataAction',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await dashboardAPIRequestGetUser({_id})
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

export const updateUserDataAction = createAsyncThunk(
    'adminPanelUsers/updateUserDataAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            data,
            token: localStorage.wt
        }
        return await dashboardAPIRequestUpdateUser(data)
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
export const deleteUserAction = createAsyncThunk(
    'adminPanelUsers/deleteUserAction',
    async (id: string|null, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            id,
            token: localStorage.wt
        }
        return await dashboardAPIRequestDeleteUser(id)
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
        })
    }
)
export const changePasswordAction = createAsyncThunk(
    'adminPanelUsers/changePasswordAction',
    async ({oldPass, newPass, newPass2}: { oldPass: string, newPass: string, newPass2: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await dashboardAPIRequestChangePassword(oldPass, newPass, newPass2)
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
            return await commonAPIRequestGetSignedInUserData(fields)
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

        editUserDataAction: (state, action: PayloadAction<any>) => {
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
            .addCase(getUserDataAction.fulfilled, (state, action: PayloadAction<any>) => {
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


export const {editUserDataAction} = usersSlice.actions

export const usersReducer = (state: RootState) => state?.users || null

export default usersSlice.reducer