import {createAsyncThunk} from "@reduxjs/toolkit";
import getConversations from "api-requests/src/client/users/getConversations";


export const getConversationsAction = createAsyncThunk(
    'user/getConversationsAction',
    async (_id: string, thunkAPI) => {
        return getConversations(_id).then(res => {
            return res.data?.conversations
        })
    }
)