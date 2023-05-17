import { createAsyncThunk } from "@reduxjs/toolkit";
import {clientAPIRequestFollowUser} from "api-requests";
import { loading } from "@store_toolkit/clientReducers/globalStateReducer";

export const followUserAction = createAsyncThunk<void, string>(
    'user/followUserAction',
    async (_id, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));
            await clientAPIRequestFollowUser(_id);
        } catch (error) {
            // Consider adding error handling logic here, e.g., logging or dispatching an error action
        } finally {
            thunkAPI.dispatch(loading(false));
        }
    }
);
