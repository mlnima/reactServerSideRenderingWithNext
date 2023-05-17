import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import {clientAPIRequestStartAConversation} from "api-requests";

interface IArgs {
    users: string[],
}

interface IResponse {
    conversationData: {}
}

export const startAConversationAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/startAConversationAction',
    async ({users}, thunkAPI) => {
        try {

            thunkAPI.dispatch(loading(true));
            const response = await clientAPIRequestStartAConversation({users});
            thunkAPI.dispatch(loading(false));
            //@ts-ignore
            return response?.data?.conversation || {};
        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return {conversationsList: []};
        }
    }
);