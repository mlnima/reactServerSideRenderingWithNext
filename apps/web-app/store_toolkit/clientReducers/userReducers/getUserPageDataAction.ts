import { createAsyncThunk } from "@reduxjs/toolkit";
import getUser from "api-requests/src/client/users/getUser";

interface GetUserPageDataActionArgs {
    username?: string;
    _id?: string;
    fields: string[];
}

interface GetUserPageDataActionResponse {
    userData?: any; // Replace "any" with actual type of userData
}

export const getUserPageDataAction = createAsyncThunk<GetUserPageDataActionResponse, GetUserPageDataActionArgs>(
    'user/getUserPageDataAction',
    async ({ username, _id, fields }, thunkAPI) => {
        const response = await getUser({ username, _id, fields });
        return {
            userData: response.data.userData,
        };
    }
);
