import { createAsyncThunk } from "@reduxjs/toolkit";
import followUser from "api-requests/src/client/users/followUser";
import { loading } from "@store_toolkit/clientReducers/globalStateReducer";

export const followUserAction = createAsyncThunk<void, string>(
    'user/followUserAction',
    async (_id, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true));
            await followUser(_id);
        } catch (error) {
            // Consider adding error handling logic here, e.g., logging or dispatching an error action
        } finally {
            thunkAPI.dispatch(loading(false));
        }
    }
);
