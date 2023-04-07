import { createAsyncThunk } from "@reduxjs/toolkit";
import unFollowUser from "api-requests/src/client/users/unFollowUser";
import { loading } from "@store_toolkit/clientReducers/globalStateReducer";

interface UnfollowUserActionResponse {}

export const unfollowUserAction = createAsyncThunk<UnfollowUserActionResponse, string>(
    'user/unfollowUserAction',
    async (_id, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        try {
            await unFollowUser(_id);
        } catch (error) {
            console.log(error);
        } finally {
            thunkAPI.dispatch(loading(false));
        }
    }
);
