import { createAsyncThunk } from "@reduxjs/toolkit";
import {clientAPIRequestDeleteConversation} from "@repo/api-requests";
import { setAlert } from "@store/reducers/globalStateReducer";

interface DeleteConversationActionResponse {
    deletedConversationId?: string;
}

export const deleteConversationAction = createAsyncThunk<DeleteConversationActionResponse, string>(
    'user/deleteConversationAction',
    async (_id, thunkAPI) => {
        try {
            const response = await clientAPIRequestDeleteConversation(_id);
            thunkAPI.dispatch(
                setAlert({ message: response.data.message, type: 'success' })
            );
            return { deletedConversationId: _id };
        } catch (error) {
            // thunkAPI.dispatch(
            //     setAlert({ message: error.response.data.message, type: 'error' })
            // );
            return {};
        }
    }
);