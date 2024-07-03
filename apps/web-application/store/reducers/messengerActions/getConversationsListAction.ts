import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "@store/reducers/globalStateReducer";
import {clientAPIRequestGetConversationsList} from "@repo/api-requests";
import {uniqArrayBy} from "@repo/shared-util";
import {RootState} from "@store/store";


interface IArgs {
    limit: number,
    skip: number
}

interface IResponse {
    conversationsList: {}[]
}


// @ts-ignore
export const getConversationsListAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/getConversationsListAction',
    // @ts-ignore
    async ({limit, skip}, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));

            const response = await clientAPIRequestGetConversationsList({limit, skip});

            thunkAPI.dispatch(loading(false));

            // @ts-ignore
            const state = thunkAPI.getState() as RootState;
            // @ts-ignore
            const prevConversationList = state.messenger.conversationsList;
            //@ts-ignore
            return uniqArrayBy([...prevConversationList,...(response?.data?.conversationsList || [])],'_id')

        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return {conversationsList: []};
        }
    }
);