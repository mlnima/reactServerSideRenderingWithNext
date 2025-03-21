// @ts-nocheck
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loading } from '@store/reducers/globalStateReducer';
import { AxiosError, AxiosResponse } from 'axios';
import {
  dashboardAPIRequestGetChatroom,
  // dashboardAPIRequestCreateChatroom
} from '@repo/api-requests';
import { RootState } from '@store/store';
import { setAlert } from '@storeDashboard/reducers/globalStateReducer';
import dashboardGetChatrooms from '@lib/actions/database/operations/chatrooms/dashboardGetChatrooms';
import dashboardGetChatroom from '@lib/actions/database/operations/chatrooms/dashboardGetChatroom';


const initialState = {
  chatrooms: [],
  chatroom: {},
};

export const getChatroomsAction = createAsyncThunk(
  'adminPanelPages/getChatroomsAction',
  async (queries: object, thunkAPI) => {


    thunkAPI.dispatch(loading(true));
    const { data, success, message, errorCode, error } = await dashboardGetChatrooms(queries);
    thunkAPI.dispatch(loading(false));


    if (!success) {
      console.log(`getFormsAction error=> `, error);
      thunkAPI.dispatch(
        setAlert({
          message,
          type: 'Error',
          err: errorCode,
        }),
      );
      return;
    }


    return {
      chatrooms: data?.chatrooms,
      totalCount: data?.totalCount,
    };


    // thunkAPI.dispatch(loading(true))
    // return await dashboardAPIRequestGetChatrooms().then((response: AxiosResponse) => {
    //     console.log(response.data)
    //     return response.data?.chatrooms
    // }).catch((error: AxiosError) => {
    //      return []
    // }).finally(() => thunkAPI.dispatch(loading(false)))
  },
);

export const getChatroomAction = createAsyncThunk(
  'adminPanelPages/getChatroomAction',
  async (chatroomId: string, thunkAPI) => {


    thunkAPI.dispatch(loading(true));
    const { data, success, message, errorCode, error } = await dashboardGetChatroom(chatroomId);
    thunkAPI.dispatch(loading(false));

    if (!success || !data?.chatroom) {
      console.log(`getFormsAction error=> `, error);
      thunkAPI.dispatch(
        setAlert({
          message,
          type: 'Error',
          err: errorCode,
        }),
      );
      return;
    }

    return data?.chatroom;
  },
);

export const createChatroomAction = createAsyncThunk(
  'adminPanelPages/getChatroomAction',
  async (data: string, thunkAPI) => {
    thunkAPI.dispatch(loading(true));
    return await createChatroom(data).then((response: AxiosResponse) => {
      return response.data?.chatroom;
    }).catch((error: AxiosError) => {

    }).finally(() => thunkAPI.dispatch(loading(false)));
  },
);


export const chatroomsSlice = createSlice({
  name: 'adminPanelChatrooms',
  initialState,
  reducers: {
    editChatroomFieldAction: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        chatroom: {
          ...state.chatroom,
          ...action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatroomsAction.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          ...action.payload,
        };
      })
      .addCase(getChatroomAction.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          chatroom: action.payload,
        };
      });

  },
});

export const { editChatroomFieldAction } = chatroomsSlice.actions;

export const chatroomsReducer = (state: RootState) => state?.chatrooms || null;

export default chatroomsSlice.reducer;