import { createAsyncThunk } from "@reduxjs/toolkit";

interface SetPartnerVideoActionResponse {
    stream: any; // Replace "any" with actual type of stream
}

export const setPartnerVideoAction = createAsyncThunk<SetPartnerVideoActionResponse, any>(
    'user/setPartnerVideoAction',
    async (stream, thunkAPI) => {
        return { stream };
    }
);
