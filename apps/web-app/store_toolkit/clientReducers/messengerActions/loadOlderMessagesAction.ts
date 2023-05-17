import { createAsyncThunk } from '@reduxjs/toolkit';
import { loading } from '@store_toolkit/clientReducers/globalStateReducer';
import {clientAPIRequestLoadOlderMessages} from 'api-requests';
import React from "react";

interface IArgs {
    limit: number;
    skip: number;
    conversationId: string;
    messageAreaRef: React.RefObject<HTMLDivElement>
}

interface IResponse {
    messages: any[]; // Changed from '{}' to 'any[]' to represent an array of messages
}

export const loadOlderMessagesAction = createAsyncThunk<IResponse, IArgs>(
    'messenger/loadOlderMessages',
    async ({ limit, skip, conversationId,messageAreaRef }, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));

            const response = await clientAPIRequestLoadOlderMessages({ limit, skip, conversationId });
            thunkAPI.dispatch(loading(false));

            if (messageAreaRef?.current) {
                messageAreaRef.current.scroll({
                    top: 1,
                    behavior: 'smooth',
                });
            }

            //@ts-ignore
            return { messages: response?.data?.messages || [] };
        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return { messages: [] }; // Changed from 'conversationsList' to 'messages' to match the interface
        }
    }
);