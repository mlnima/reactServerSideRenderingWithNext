import { createAsyncThunk } from "@reduxjs/toolkit";
import getUser from "api-requests/src/client/users/getUser";
import getUserPageData from "api-requests/src/client/users/getUserPageData";

interface GetUserPageDataActionArgs {
    username?: string;
    userWhoRequestIt?: string;
    fields: string[];
}

interface GetUserPageDataActionResponse {
    userData?: any;
}

export const getUserPageDataAction = createAsyncThunk<GetUserPageDataActionResponse, GetUserPageDataActionArgs>(
    'user/getUserPageDataAction',
    async ({ username, userWhoRequestIt, fields }, thunkAPI) => {
        const response = await getUserPageData({ username, userWhoRequestIt, fields });
        return response?.data;
    }
);
