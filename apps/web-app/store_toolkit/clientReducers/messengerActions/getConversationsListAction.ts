import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import getConversationsList from "api-requests/src/client/messenger/getConversationsList";
import {uniqArrayBy} from "custom-util";
import {RootState} from "@store_toolkit/store";


interface IArgs {
    limit: number,
    skip: number
}

interface IResponse {
    conversationsList: {}[]
}


export const getConversationsListAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/getConversationsListAction',
    // @ts-ignore
    async ({limit, skip}, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));

            const response = await getConversationsList({limit, skip});

            thunkAPI.dispatch(loading(false));

            const state = thunkAPI.getState() as RootState;
            const prevConversationList = state.messenger.conversationsList;
            //@ts-ignore
            return uniqArrayBy([...prevConversationList,...(response?.data?.conversationsList || [])],'_id')

        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return {conversationsList: []};
        }
    }
);