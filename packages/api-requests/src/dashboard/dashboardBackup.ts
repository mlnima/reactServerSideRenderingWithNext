import qs from 'qs';
import AxiosInstance from "../lib/AxiosInstance";

interface IMetasProps{
    metaType : string,
    fields:string[],
}
interface IPostsProps{
    postType : string,
    fields:string[],
}


// export const backupPosts = async ({ postType, fields }:IPostsProps) => {
//
//     return await AxiosInstance.get(`/api/dashboard/backup/posts`, {
//         responseType: 'blob',
//         params: {
//             postType,
//             fields
//         },
//         paramsSerializer: {
//             indexes: null, // no brackets at all
//         }
//     });
// };

// export const backup = async () => {
//
//     return await AxiosInstance.get(`/api/dashboard/backup`, {
//         responseType: 'blob',
//     });
//
//
// };

//, { arrayFormat: 'repeat' }