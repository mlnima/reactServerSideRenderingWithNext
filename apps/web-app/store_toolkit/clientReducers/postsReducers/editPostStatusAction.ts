//editPostStatusAction


import {createAsyncThunk} from "@reduxjs/toolkit";
import bulkActionOnPosts from "api-requests/src/dashboard/posts/bulkActionOnPosts";
import {AxiosResponse} from "axios";

export const editPostStatusAction = createAsyncThunk(
    'adminPanelPosts/editPostStatusAction',
    async ({ids, status}: { ids: string | string[], status: string }, thunkAPI) => {

        await bulkActionOnPosts(ids, status).then((res: AxiosResponse<any>) => {


        }).catch((error) => {
            console.log(error)

        })
    }
)