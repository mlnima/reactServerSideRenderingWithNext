import { createAsyncThunk } from "@reduxjs/toolkit";
// import {clientAPIRequestGetUserPageData} from "@repo/api-requests";

// interface GetUserPageDataActionArgs {
//     username?: string;
//     userWhoRequestIt?: string;
//     fields: string[];
// }
//
// interface GetUserPageDataActionResponse {
//     userData?: any;
// }

// export const getUserPageDataAction = createAsyncThunk<GetUserPageDataActionResponse, GetUserPageDataActionArgs>(
//     'user/getUserPageDataAction',
//     async ({ username, userWhoRequestIt, fields }, thunkAPI) => {
//         const response = await clientAPIRequestGetUserPageData({ username, userWhoRequestIt, fields });
//         return response?.data;
//     }
// );
