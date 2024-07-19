// import axios from 'axios';
//
// // will be blocked by cors on target site, we make a better one from backend
//
// export const checkImageStatusCode=async (url:string)=>{
//     try {
//         const response = await axios.get(url);
//         return response.status;
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             return error.response.status;
//         }
//
//     }
// }