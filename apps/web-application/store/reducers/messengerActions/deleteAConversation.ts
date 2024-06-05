import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientAPIRequestDeleteConversation } from "@repo/api-requests";
import { setAlert } from "@store/reducers/globalStateReducer";

interface IProps {
    deletedConversationId?: string;
}

interface APIError {
    response: {
        data: {
            message: string;
        };
    };
}

function isAPIError(error: any): error is APIError {
    return (
        error.response &&
        error.response.data &&
        typeof error.response.data.message === "string"
    );
}

export const deleteAConversationAction = createAsyncThunk<
    IProps,
    string,
    { rejectValue: APIError }
>(
    "user/deleteAConversationAction",
    async (_id: string, thunkAPI) => {
        try {
            const response = await clientAPIRequestDeleteConversation(_id);
            thunkAPI.dispatch(
                setAlert({ message: response.data.message, type: "success" })
            );
            return { deletedConversationId: _id };
        } catch (error: unknown) {
            if (isAPIError(error)) {
                thunkAPI.dispatch(
                    setAlert({ message: error.response.data.message, type: "error" })
                );
            }
            return thunkAPI.rejectWithValue(error as APIError);
        }
    }
);
