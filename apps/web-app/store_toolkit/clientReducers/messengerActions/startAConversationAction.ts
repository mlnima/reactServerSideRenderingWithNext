import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";
import {clientAPIRequestStartAConversation} from "api-requests";
import {NextRouter} from "next/router";

interface IArgs {
    users: string[],
    router:NextRouter
}

interface IResponse {
    conversationData: {}
}

//** will be deleted the request will be handle directly no need of redux
export const startAConversationAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/startAConversationAction',
    //@ts-ignore
    async ({users,router}, thunkAPI) => {
        try {

            thunkAPI.dispatch(loading(true));
            const response = await clientAPIRequestStartAConversation({users})
            //@ts-ignore
            if (response?.data?.conversation?.id) {
                //@ts-ignore
                await router.push(`/messenger/${response.data.conversation.id}`)
            }
            thunkAPI.dispatch(loading(false));
        } catch (error) {
            thunkAPI.dispatch(loading(false));
        }
    }
);