import {createAsyncThunk} from "@reduxjs/toolkit";
import {dashboardAPIRequestBulkActionOnPosts} from "api-requests";
import {AxiosResponse} from "axios";

export const editPostStatusAction = createAsyncThunk(
    'adminPanelPosts/editPostStatusAction',
    async ({ids, status}: { ids: string | string[], status: string }, thunkAPI) => {
        if (ids){
            //@ts-ignore
            await dashboardAPIRequestBulkActionOnPosts(ids, status).then((res: AxiosResponse<any>) => {
            }).catch((error) => {
                console.log(error)

            })
        }


    }
)