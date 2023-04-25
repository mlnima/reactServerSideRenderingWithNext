import { createAsyncThunk } from "@reduxjs/toolkit";
import unFollowUser from "api-requests/src/client/users/unFollowUser";
import { loading } from "@store_toolkit/clientReducers/globalStateReducer";

export const unfollowUserAction = createAsyncThunk<void, string>(
    'user/unfollowUserAction',
    async (_id:string, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));
            await unFollowUser(_id);
        } catch (error) {
            // Consider adding error handling logic here, e.g., logging or dispatching an error action
        } finally {
            thunkAPI.dispatch(loading(false));
        }
    }
);