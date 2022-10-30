import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../../../clientReducers/globalStateReducer";
import Axios from "@_variables/util/Axios";
import fetchUserEditingPost
    from "./_clientPostsAsyncThunksFetchUserEditingPost";

export const _ugcUploadPostImages = createAsyncThunk(
    'posts/_ugcUploadPostImages',
    async (uploadData: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await Axios.post('/api/v1/fileManager/ugc_postImagesUpload', uploadData).then(response => {
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

        return await Axios.post('/api/v1/fileManager/ugc_postImageDelete', deletingData).then(response => {
            if (response.data?.images) {
                return response.data.images
            }
        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

