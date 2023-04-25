import { createAsyncThunk } from '@reduxjs/toolkit';
import { loading } from '@store_toolkit/clientReducers/globalStateReducer';
import loadOlderMessages from '../../../../../packages/api-requests/src/client/messenger/loadOlderMessages';

interface IArgs {
    limit: number;
    skip: number;
    conversationId: string;
}

interface IResponse {
    messages: any[]; // Changed from '{}' to 'any[]' to represent an array of messages
}

export const loadOlderMessagesAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/loadOlderMessages',
    async ({ limit, skip, conversationId }, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));

            const response = await loadOlderMessages({ limit, skip, conversationId });
            thunkAPI.dispatch(loading(false));
            //@ts-ignore
            return { messages: response?.data?.messages || [] };
        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return { messages: [] }; // Changed from 'conversationsList' to 'messages' to match the interface
        }
    }
);