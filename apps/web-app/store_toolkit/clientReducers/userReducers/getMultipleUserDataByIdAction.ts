//getMultipleUserDataByIdAction


import {createAsyncThunk} from "@reduxjs/toolkit";
import { loading } from "../globalStateReducer";
import getUsers from "api-requests/src/client/users/getUsers";

export const getMultipleUserDataByIdAction = createAsyncThunk(
    'user/getMultipleUserDataByIdAction',
    async ({usersList, type}: { usersList: {}[], type: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getUsers(usersList).then(res => {
            return {[type]: res?.data?.users || []}
        }).catch(error => {
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)