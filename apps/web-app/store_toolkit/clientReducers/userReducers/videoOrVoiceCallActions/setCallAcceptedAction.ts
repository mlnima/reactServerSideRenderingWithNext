import { createAsyncThunk } from "@reduxjs/toolkit";

interface SetCallAcceptedActionResponse {
    isAccepted: boolean;
}

export const setCallAcceptedAction = createAsyncThunk<SetCallAcceptedActionResponse, boolean>(
    'user/setCallAcceptedAction',
    async (isAccepted, thunkAPI) => {
        return { isAccepted };
    }
);
