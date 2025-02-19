import { createAsyncThunk } from '@reduxjs/toolkit';
import { loading } from '@store/reducers/globalStateReducer';
// import {clientAPIRequestLoadOlderMessages} from '@repo/api-requests';
import React from "react";
import { getConversationMessages } from '@lib/database/operations/Messenger';

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

            //const response = await clientAPIRequestLoadOlderMessages({ limit, skip, conversationId });

            const messages = await getConversationMessages({ limit, skip, conversationId,token:localStorage.getItem('wt') });
            console.log(`messages=> `,messages)
            thunkAPI.dispatch(loading(false));

            if (messageAreaRef?.current) {
                messageAreaRef.current.scroll({
                    top: 1,
                    behavior: 'smooth',
                });
            }

            //@ts-ignore
            return { messages: messages || [] };
        } catch (error) {
            thunkAPI.dispatch(loading(false));
            return { messages: [] }; // Changed from 'conversationsList' to 'messages' to match the interface
        }
    }
);