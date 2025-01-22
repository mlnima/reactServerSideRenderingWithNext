// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {convertMetasTypeToSingular} from "@repo/utils";
// import {clientAPIRequestGetPosts} from "@repo/api-requests";
//
// interface IFetchPosts {
//     context: any,
//     metaId: string| null,
//     options: {
//         page: string,
//         setHeadData?: boolean
//     }
// }
//
// const getPostsAction = createAsyncThunk(
//     'posts/getPostsAction',
//     async ({context, metaId, options}: IFetchPosts, thunkAPI) => {
//         const apiData = await clientAPIRequestGetPosts(context.query,metaId)
//         const metaType = apiData.data?.meta?.type
//         const singularMetaForm = convertMetasTypeToSingular(metaType);
//
//         const dataForm = metaType && singularMetaForm ? `${singularMetaForm}Data` : '';
//         const meta = apiData?.data?.meta
//         const metaData = dataForm && meta ? {[dataForm]: meta} : {}
//
//         return {
//             posts: apiData.data?.posts || [],
//             totalCount: apiData?.data?.totalCount || 0,
//             ...metaData
//         }
//
//     }
// )
//
// export default getPostsAction