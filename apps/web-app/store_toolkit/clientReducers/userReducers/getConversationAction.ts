import { createAsyncThunk } from "@reduxjs/toolkit";
import getConversation from "api-requests/src/client/users/getConversation";

interface GetConversationActionArgs {
    _id: string;
    loadAmount: number;
}

interface GetConversationActionResponse {
    conversation?: any; // Replace "any" with actual type of conversation
}

export const getConversationAction = createAsyncThunk<GetConversationActionResponse, GetConversationActionArgs>(
    'user/getConversationAction',
    async ({ _id, loadAmount }, thunkAPI) => {
        const response = await getConversation(_id, loadAmount);

        return response?.data?.conversation || {};
    }
);
