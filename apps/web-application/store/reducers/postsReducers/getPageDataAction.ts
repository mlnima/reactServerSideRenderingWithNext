// import {createAsyncThunk} from "@reduxjs/toolkit";
// import type {GetServerSidePropsContext, PreviewData} from "next";
// import {setHeadData, setNotFoundPage} from "../globalStateReducer";
// import {customPageCanonicalUrlGenerator} from "shared-util";
// import {ParsedUrlQuery} from "querystring";
// import {clientAPIRequestGetPage} from "@repo/api-requests";
//
// const getPageDataAction = createAsyncThunk(
//     'posts/getPageDataAction',
//     async (context :GetServerSidePropsContext<ParsedUrlQuery,PreviewData>, thunkAPI) => {
//         const pageName = context.query?.pageName
//
//         return await clientAPIRequestGetPage(pageName as string)
//             .then(res => {
//
//             if (res.data?.pageData && res.data?.pageData?.status === 'published') {
//
//                 const canonicalUrl = customPageCanonicalUrlGenerator(pageName,context.locale)
//
//                 thunkAPI.dispatch(setHeadData({
//                     title: res.data?.pageData?.title || pageName,
//                     description: res.data?.pageData?.description?.substring(0, 155) || null,
//                     keywords: res.data?.pageData?.keywords || null,
//                     ogTitle: res.data?.pageData?.title || pageName,
//                     canonicalUrl,
//                     ogType: 'website',
//                     ogDescription: res.data?.pageData?.description?.substring(0, 155) || null,
//                     ogUrl: canonicalUrl,
//                     ogImage: res.data?.pageData?.imageUrl || null,
//                     twitterCard: true,
//                     twitterUrl: canonicalUrl,
//                     twitterTitle: res.data?.pageData?.title || pageName,
//                     twitterDescription: res.data?.pageData?.description?.substring(0, 155) || null,
//                     twitterImage: res.data?.pageData?.imageUrl || null,
//                 }))
//
//                 thunkAPI.dispatch(setNotFoundPage(false))
//
//                 return res.data?.pageData || null
//             } else {
//                 thunkAPI.dispatch(setNotFoundPage(true))
//                 return null
//             }
//
//         })
//     }
// )
//
// export default getPageDataAction