//deleteAConversationAction

import { createAsyncThunk } from "@reduxjs/toolkit";
import deleteConversation from "api-requests/src/client/users/deleteConversation";
import { setAlert } from "@store_toolkit/clientReducers/globalStateReducer";

interface IProps {
    deletedConversationId?: string;
}

export const deleteAConversationAction = createAsyncThunk<IProps, string>(
    'user/deleteAConversationAction',
    async (_id, thunkAPI) => {
        try {
            const response = await deleteConversation(_id);
            thunkAPI.dispatch(
                setAlert({ message: response.data.message, type: 'success' })
            );
            return { deletedConversationId: _id };
        } catch (error) {
            thunkAPI.dispatch(
                setAlert({ message: error.response.data.message, type: 'error' })
            );
            return {};
        }
    }
);