import {createAsyncThunk} from "@reduxjs/toolkit";
import getPrivateMessages from "api-requests/src/client/users/getPrivateMessages";

interface GetPrivateMessagesParams {
    senderId: string,
    receiverId: string,
    amount?: number,
    skip?: number
}

export const getPrivateMessagesAction = createAsyncThunk(
    "user/getPrivateMessagesAction",
    async ({senderId, receiverId, amount,skip}: GetPrivateMessagesParams, thunkAPI) => {
        return await getPrivateMessages({senderId, receiverId, amount,skip}).then((res) => {
            //@ts-ignore
            return res.data?.privateMessages;
        });
    }
);
