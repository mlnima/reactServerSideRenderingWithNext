import { createAsyncThunk } from '@reduxjs/toolkit';
import { loading, setAlert } from '../globalStateReducer';
import {updatePost} from "@repo/api-requests";
import {AxiosError, AxiosResponse} from "axios";

const updatePostAction = createAsyncThunk(
    'posts/updatePostAction',
    async (editedPost: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true));

        await updatePost(editedPost)
            .then((res:AxiosResponse) => {
                if (res.data?.message) {
                    console.log(res.data);
                    thunkAPI.dispatch(
                        setAlert({
                            type: 'success',
                            message: res.data.message,
                        }),
                    );
                }
            })
            .catch((error:AxiosError) => {
                thunkAPI.dispatch(
                    setAlert({
                        type: 'error',
                        // @ts-expect-error: need fix
                        message: error.response?.data?.message ? error.response.data.message : '',
                    }),
                );
            })
            .finally(() => thunkAPI.dispatch(loading(false)));
    },
);

export default updatePostAction;
