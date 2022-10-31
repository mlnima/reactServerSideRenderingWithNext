// import http from 'http';
// import fs from 'fs';
//
// const fileDownloader = async (url:string, dest:string) => {
//     try {
//         const file = fs.createWriteStream(dest);
//         await http.get(url, async (response) => {
//             await response.pipe(file);
//             await file.on('finish', function () {
//                 return dest
//             });
//         }).on('error', () => {
//             try {
//                 //@ts-ignore
//                 fs.unlink(dest)
//             }catch (err) {
//
//             }
//             return url
//         });
//
//     } catch (err) {
//         return url
//     }
// };
//
// export default fileDownloader;

export default {}