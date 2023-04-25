import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import getAConversation from "api-requests/src/client/messenger/getAConversation";

interface IArgs {
    conversationId: string
}

interface IResponse {
    conversationData: {}
}

export const getAConversationAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/getAConversationAction',
    async ({conversationId}, thunkAPI) => {
        try {

            thunkAPI.dispatch(loading(true));
            const response = await getAConversation({conversationId});
            thunkAPI.dispatch(loading(false));

            //@ts-ignore
            return response?.data?.conversation || {};
        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return {conversationsList: []};
        }
    }
);