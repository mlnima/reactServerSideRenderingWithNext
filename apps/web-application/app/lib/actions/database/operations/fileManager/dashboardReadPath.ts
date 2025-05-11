'use server';
import fs from 'fs/promises';
import { errorResponse, successResponse } from '@lib/actions/response';
import path from 'path';

interface IArg {
  targetPath: string;
}

const dashboardReadPath = async ({ targetPath }: IArg) => {
  try {
    const absolutePath = path.join(process.cwd(), targetPath);

    // Check if it's a directory
    const stat = await fs.stat(absolutePath);

    if (stat.isDirectory()) {
      const data = await fs.readdir(absolutePath);
      return successResponse({
        data: {
          data,
          type: 'dir',
        },
      });
    } else {
      const fileData = await fs.readFile(absolutePath, 'utf8');
      return successResponse({
        data: {
          data: fileData,
          type: 'file',
        },
      });
    }
  } catch (error: any) {
    return errorResponse({
      message: 'Something Went Wrong',
      error,
    });
  }
};

export default dashboardReadPath;



// 'use server';
// import fs from 'fs';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import path from 'path';
//
// interface IArg{
//   targetPath:string
// }
//
// const dashboardReadPath = async ({targetPath}:IArg)=>{
//   try {
//     const absolutePath = path.join(process.cwd(),targetPath);
//
//     fs.readdir(absolutePath, (error, data) => {
//       if (error) {
//         if (error.code === 'ENOTDIR') {
//           fs.readFile(targetPath, (err, fileData) => {
//             if (error) {
//               return errorResponse({
//                 message: 'Something Went Wrong',
//                 error,
//               });
//             } else {
//               return successResponse({
//                 data: {
//                   data: fileData.toString('utf8'),
//                   type: 'file'
//                 },
//               });
//             }
//           });
//         } else {
//           return errorResponse({
//             message: 'Something Went Wrong',
//           });
//         }
//       } else {
//         return successResponse({
//           data: {
//             data,
//             type: 'dir'
//           },
//         });
//       }
//     });
//   }catch (error){
//     console.error(`uploadUserProfileImage => `, error);
//     return errorResponse({
//       message: 'Something Went Wrong',
//       error,
//     });
//   }
// }
//
// export default dashboardReadPath;