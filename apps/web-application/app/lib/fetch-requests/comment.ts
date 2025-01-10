// import config from '@lib/fetch-requests/config';

// const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

// type IFetchComments = {
//     onDocument?: string;
//     skip?: number;
//     limit?: number;
//     revalidate?: number | undefined;
//     tags?: string[];
// };

// export const fetchComments = async ({
//     onDocument,
//     skip = 0,
//     limit = 5,
//     revalidate = 10,
//     tags,
// }: IFetchComments) => {
//     try {
//         const response = await fetch(
//             `${APIServerUrl}/api/v1/comment?onDocument=${onDocument}&skip=${skip}&limit=${limit}`,
//             config({
//                 revalidate,
//                 tags: [...(tags || []), 'cacheItem', 'comments'],
//             }),
//         );
//         return await response.json();
//     } catch  {
//         return
//     }
// };

// type IPostNewComment = {
//     commentData?: object;
//     revalidate?: number | undefined;
// };

// export const postNewComment = async ({ commentData, revalidate }: IPostNewComment) => {
//     try {
//         const response = await fetch(
//             `${APIServerUrl}/api/v1/comment`,
//             config({
//                 revalidate,
//                 method: 'POST',
//                 body: { commentData },
//             }),
//         );
//
//         return await response.json();
//     } catch {
//         return
//     }
// };
