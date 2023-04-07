//followUserAction


import {createAsyncThunk} from "@reduxjs/toolkit";
import followUser from "api-requests/src/client/users/followUser";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";

export const followUserAction = createAsyncThunk(
    'user/followUserAction',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await followUser(_id).then(response => {
        }).catch(error => {
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)