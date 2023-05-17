import { createAsyncThunk } from "@reduxjs/toolkit";
import {clientAPIRequestUnFollowUser} from "api-requests";
import { loading } from "@store_toolkit/clientReducers/globalStateReducer";

export const unfollowUserAction = createAsyncThunk<void, string>(
    'user/unfollowUserAction',
    async (_id:string, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));
            await clientAPIRequestUnFollowUser(_id);
        } catch (error) {
            // Consider adding error handling logic here, e.g., logging or dispatching an error action
        } finally {
            thunkAPI.dispatch(loading(false));
        }
    }
);