import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import startAConversation from "api-requests/src/client/messenger/startAConversation";

interface IArgs {
    users: string[]
}

interface IResponse {
    conversationData: {}
}

export const startAConversationAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/startAConversationAction',
    async ({users}, thunkAPI) => {
        try {

            thunkAPI.dispatch(loading(true));
            const response = await startAConversation({users});
            thunkAPI.dispatch(loading(false));

            //@ts-ignore
            return response?.data?.conversation || {};
        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return {conversationsList: []};
        }
    }
);