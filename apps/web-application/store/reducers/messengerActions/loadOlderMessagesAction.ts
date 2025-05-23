import { createAsyncThunk } from '@reduxjs/toolkit';
import { loading, setAlert } from '@store/reducers/globalStateReducer';
import React from 'react';
import getConversationMessages from '@lib/actions/database/messenger/getConversationMessages';

interface IArgs {
  limit: number;
  skip: number;
  conversationId: string;
  messageAreaRef: React.RefObject<HTMLDivElement | null>;
}

export const loadOlderMessagesAction = createAsyncThunk(
  'messenger/loadOlderMessages',
  async ({ limit, skip, conversationId, messageAreaRef } : IArgs , thunkAPI) => {
    try {
      thunkAPI.dispatch(loading(true));

      //const response = await clientAPIRequestLoadOlderMessages({ limit, skip, conversationId });

      const { data, success, message } = await getConversationMessages({
        limit,
        skip,
        conversationId,
      });
      console.log(`data=> `,data)

      thunkAPI.dispatch(loading(false));

      if (!success || !data) {
        thunkAPI.dispatch(setAlert({
          message,
          type: 'error',
        }));
        return;
      }

      if (messageAreaRef?.current) {
        messageAreaRef.current.scroll({
          top: 1,
          behavior: 'smooth',
        });
      }

      return { messages: data?.messages || [] };
    } catch (error) {
      thunkAPI.dispatch(loading(false));
      thunkAPI.dispatch(setAlert({
        message: 'Something went wrong please try again later',
        type: 'error',
      }));
      return;
    }
  },
);