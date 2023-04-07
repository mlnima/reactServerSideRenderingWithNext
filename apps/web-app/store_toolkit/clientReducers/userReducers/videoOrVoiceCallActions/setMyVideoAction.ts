import { createAsyncThunk } from "@reduxjs/toolkit";

interface SetMyVideoActionResponse {
    myVideo: any; // Replace "any" with actual type of myVideo
}

export const setMyVideoAction = createAsyncThunk<SetMyVideoActionResponse, any>(
    'user/setMyVideoData',
    async (myVideo, thunkAPI) => {
        return { myVideo };
    }
);