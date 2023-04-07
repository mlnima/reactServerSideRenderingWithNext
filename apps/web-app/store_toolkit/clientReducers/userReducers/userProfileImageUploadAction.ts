//userProfileImageUploadAction


import {createAsyncThunk} from "@reduxjs/toolkit";
import userProfileImageUpload from "api-requests/src/client/users/userProfileImageUpload";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";

export const userProfileImageUploadAction = createAsyncThunk(
    'user/userProfileImageUploadAction',
    async (image: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await userProfileImageUpload(image).then(response => {
        }).catch(error => {
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)