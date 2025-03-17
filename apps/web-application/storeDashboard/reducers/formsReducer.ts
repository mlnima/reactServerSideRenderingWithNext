// @ts-nocheck
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loading, setAlert } from './globalStateReducer';
import { AxiosError, AxiosResponse } from 'axios';
import { RootState } from '../store';
import { dashboardAPIRequestGetForms, dashboardAPIRequestGetForm } from '@repo/api-requests';
import dashboardGetPosts from '@lib/actions/database/operations/posts/dashboardGetPosts';
import dashboardGetForms from '@lib/actions/database/operations/forms/dashboardGetForms';


const initialState = {
  forms: [],
  totalCount: 0,
  form: {},
};

export const getFormsAction = createAsyncThunk(
  'adminPanelForms/getFormsAction',
  async (queries: object, thunkAPI) => {
    thunkAPI.dispatch(loading(true));
    const { data, success, message, errorCode, error } = await dashboardGetForms(queries);
    thunkAPI.dispatch(loading(false));

    if (!success) {
      console.log(`getPostsAction error=> `, error);
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
      forms: data?.forms,
      totalCount: data?.totalCount,
    };
    // return await dashboardAPIRequestGetForms(data).then((response: AxiosResponse) => {
    //     return response.data?.forms
    // }).catch((error: AxiosError) => {
    //     console.log(error)
    // }).finally(() => thunkAPI.dispatch(loading(false)))
  },
);

export const getFormAction = createAsyncThunk(
  'adminPanelForms/fetchAdminForm',
  async (_id: string | undefined, thunkAPI) => {
    thunkAPI.dispatch(loading(true));
    return await dashboardAPIRequestGetForm(_id).then((response: AxiosResponse) => {
      return response.data?.form;
    }).catch((error: AxiosError) => {
      console.log(error);
    }).finally(() => thunkAPI.dispatch(loading(false)));
  },
);

export const formsSlice = createSlice({
  name: 'adminPanelForms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFormsAction.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          ...action.payload

        };
      })
      .addCase(getFormAction.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          form: action.payload,
        };
      });
  },
});

export const adminPanelPostsReducer = (state: RootState) => state?.forms || null;

export default formsSlice.reducer;
