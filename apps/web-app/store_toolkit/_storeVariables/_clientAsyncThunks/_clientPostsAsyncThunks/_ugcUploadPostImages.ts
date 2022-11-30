import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import deletePostImage from "api-requests/src/client/posts/ugc/deletePostImage";
import UploadPostImages from "api-requests/src/client/posts/ugc/UploadPostImages";

export const _ugcUploadPostImages = createAsyncThunk(
    'posts/_ugcUploadPostImages',
    async (uploadData: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await UploadPostImages(uploadData).then(response => {
            if (response.data?.images) {
                return response.data.images
            }
        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const _ugcDeletePostImage = createAsyncThunk(
    'posts/_ugcDeletePostImage',
    async (deletingData: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await deletePostImage(deletingData)
            .then(response => {
            if (response.data?.images) {
                return response.data.images
            }
        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

