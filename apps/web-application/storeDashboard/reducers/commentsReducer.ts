// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {RootState} from "../store";
import {dashboardAPIRequestDeleteComments} from "@repo/api-requests";
import dashboardGetComments from '@lib/actions/database/operations/comments/dashboardGetComments';


const initialState = {
    comments: [],
    comment: {},
    totalCount: 0
}

export const getCommentsAction = createAsyncThunk(
    'adminPanelComments/getCommentsAction',
    async (queries: object, thunkAPI) => {

      thunkAPI.dispatch(loading(true));
      const { data, success, message, errorCode, error } = await dashboardGetComments(queries);
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
        comments: data?.comments,
        totalCount: data?.totalCount,
      };
    }
)


export const deleteCommentsAction = createAsyncThunk(
    'adminPanelComments/deleteCommentsAction',
    async (commentsIds: string[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await dashboardAPIRequestDeleteComments(commentsIds).then((res) => {
            thunkAPI.dispatch(setAlert({
                message: res.data.message || 'CommentItem Deleted',
                type: 'success'
            }))

        }).catch(err => {
            thunkAPI.dispatch(setAlert({
                message: 'Error While Deleting CommentItem',
                type: 'error',
                err
            }))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const commentsSlice = createSlice({
    name: 'adminPanelComments',
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(getCommentsAction.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            };
        })
})


export const commentsReducer = (state: RootState) => state?.comments || null
export default commentsSlice.reducer