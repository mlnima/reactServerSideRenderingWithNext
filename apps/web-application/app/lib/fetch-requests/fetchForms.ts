// const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
// import config from './config';
//
// type IPostFormData = {
//     formDataToPost?: object;
//     revalidate?: number | null | undefined;
// };
//
// export const postFormData = async ({ formDataToPost, revalidate }: IPostFormData) => {
//     try {
//         const response = await fetch(
//             `${APIServerUrl}/api/v1/form`,
//             config({ revalidate, method: 'POST', body: { data: formDataToPost } }),
//         );
//
//         return await response.json();
//     } catch {
//         return;
//     }
// };
//
//
// // if (!response.ok) {
// //     const errorData = await response.text();
// //     throw new Error(errorData);
// // }
