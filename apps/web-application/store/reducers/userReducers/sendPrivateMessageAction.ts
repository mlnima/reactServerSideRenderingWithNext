import { createAsyncThunk } from "@reduxjs/toolkit";
// import {clientAPIRequestSendPrivateMessage} from "@repo/api-requests";
import { loading } from "@store/reducers/globalStateReducer";

interface SendPrivateMessageActionArgs {
    conversationId: string;
    messageBody: Record<string, any>; // Replace "any" with actual type of messageBody
}

interface SendPrivateMessageActionResponse {}

// export const sendPrivateMessageAction = createAsyncThunk<
//     SendPrivateMessageActionResponse,
//     SendPrivateMessageActionArgs
// >('user/sendPrivateMessageAction', async ({ conversationId, messageBody }, thunkAPI) => {
//     thunkAPI.dispatch(loading(true));
//     try {
//         // await sendPrivateMessage(conversationId, messageBody);
//     } catch (error) {
//         console.log(error);
//     } finally {
//         thunkAPI.dispatch(loading(false));
//     }
// });
