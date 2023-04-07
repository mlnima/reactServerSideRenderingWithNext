import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../globalStateReducer";
import updatePost from "api-requests/src/client/posts/updatePost";
import getEditingPostAction from "@store_toolkit/clientReducers/postsReducers/getEditingPostAction";

const updatePostAction = createAsyncThunk(
    'posts/updatePostAction',
    async (editedPost:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await updatePost(editedPost).then(res => {
            if (res.data?.message) {
                console.log(res.data)
                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: res.data.message
                }))
            }
            // thunkAPI.dispatch(getEditingPostAction(res.data.post._id))

        }).catch(error => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default updatePostAction



// const uploadFilesWithJsonData = async (jsonData) => {
//     try {
//         const formData = new FormData();
//         files.forEach(({ file }) => {
//             formData.append('images', file);
//         });
//         formData.append('jsonData', JSON.stringify(jsonData));
//         await axios.post('/api/upload', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         alert('Files uploaded successfully!');
//     } catch (error) {
//         console.error(error);
//         alert('Error uploading files.');
//     }
// };