import { createAsyncThunk } from '@reduxjs/toolkit';
import { loading, setAlert } from '../globalStateReducer';
import { clientAPIRequestUpdatePost } from '@repo/api-requests';

const updatePostAction = createAsyncThunk(
    'posts/updatePostAction',
    async (editedPost: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        await clientAPIRequestUpdatePost(editedPost)
            .then(res => {
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
            .catch(error => {
                thunkAPI.dispatch(
                    setAlert({
                        type: 'error',
                        message: error.response.data.message,
                    }),
                );
            })
            .finally(() => thunkAPI.dispatch(loading(false)));
    },
);

export default updatePostAction;
