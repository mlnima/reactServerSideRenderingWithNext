//startConversationAction


import {createAsyncThunk} from "@reduxjs/toolkit";
import getStartConversation from "api-requests/src/client/users/getStartConversation";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";

export const startConversationAction = createAsyncThunk(
    'user/startConversationAction',
    async ({_id, push}: { _id: string, push: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await getStartConversation(_id).then(res => {
            if (res.data?.conversation?._id) {
                push(`/messenger/${res.data?.conversation?._id}`)
            }
        }).catch(error => {
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)