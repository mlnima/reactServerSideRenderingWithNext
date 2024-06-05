import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "@store/reducers/globalStateReducer";
import {clientAPIRequestGetAConversation} from "@repo/api-requests";

interface IArgs {
    conversationId: string
}

interface IResponse {
    conversationData: {}
}

export const getAConversationAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/getAConversationAction',
    //@ts-ignore
    async ({conversationId}, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));
            const response = await clientAPIRequestGetAConversation({conversationId});
            thunkAPI.dispatch(loading(false));
            //@ts-ignore
            return {activeConversation: response?.data?.conversation}|| {activeConversation:{}};
        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return {conversationsList: []};
        }
    }
);