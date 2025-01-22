// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {loading, setAlert} from "../globalStateReducer";
// import {clientAPIRequestPostNewComment} from "@repo/api-requests";
// import {Comment} from "@repo/typescript-types";
//
// const postNewCommentAction = createAsyncThunk(
//     'posts/postNewCommentAction',
//     async (commentData: Comment, thunkAPI) => {
//         thunkAPI.dispatch(loading(true))
//         const storeData = thunkAPI.getState()
// //@ts-ignore
//         clientAPIRequestPostNewComment(commentData)
//             .then(()=>{
//                 return {
//                 ...commentData,
//                 //@ts-ignore
//                 author: storeData.user.userData
//             }
//         }).catch(() => {
//             thunkAPI.dispatch(setAlert({
//                 type: 'error',
//                 message: 'Something Went Wrong'
//             }))
//         }).finally(() => thunkAPI.dispatch(loading(false)))
//
//     }
// )
//
// export default postNewCommentAction