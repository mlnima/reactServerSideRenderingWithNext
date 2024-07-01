// import {createAsyncThunk} from "@reduxjs/toolkit";
// import { loading } from "../globalStateReducer";
// import {clientAPIRequestGetUsers} from "@repo/api-requests";
//
// export const getMultipleUserDataByIdAction = createAsyncThunk(
//     'user/getMultipleUserDataByIdAction',
//     async ({usersList, type}: { usersList: {}[], type: string }, thunkAPI) => {
//         thunkAPI.dispatch(loading(true))
//         //@ts-ignore
//         return await clientAPIRequestGetUsers(usersList).then(res => {
//             return {[type]: res?.data?.users || []}
//         }).catch(error => {
//         }).finally(() => thunkAPI.dispatch(loading(false)))
//     }
// )