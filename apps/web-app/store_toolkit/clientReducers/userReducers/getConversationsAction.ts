import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientAPIRequestGetConversations} from "api-requests";


export const getConversationsAction = createAsyncThunk(
    'user/getConversationsAction',
    async (_id: string, thunkAPI) => {
        return clientAPIRequestGetConversations(_id).then(res => {
            return res.data?.conversations
        })
    }
)