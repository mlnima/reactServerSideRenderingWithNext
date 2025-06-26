'use server';
import { commentSchema, connectToDatabase } from '@repo/db';
import { Types } from 'mongoose';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

export interface INewComment {
  commentData: {
    body: string;
    onDocumentId: string;
    author: string;
  };
}

const newComment = async ({ commentData }: INewComment): Promise<ServerActionResponse<{
  savedCommentId: string
} | null>> => {

  let connection;

  try {
    if (
      !commentData?.body ||
      !commentData?.onDocumentId ||
      !commentData?.author
    )
      return errorResponse({
        message: 'Something went wrong please try again later',
      });

    const { isAuth } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    connection = await connectToDatabase('newComment');
    const session = await connection.startSession();

    try {
      const commentObject = {
        body: commentData.body,
        onDocumentId: new Types.ObjectId(commentData.onDocumentId),
        author: new Types.ObjectId(commentData.author),
      };

      // Create an instance of the comment model
      const commentToSave = new commentSchema(commentObject);

      // Save the document within the context of the session
      let savedComment = await commentToSave.save({ session });

      if (!savedComment) {
        return errorResponse({
          message: 'Something went wrong please try again later',
        });
      }

      const serializedData = {
        savedCommentId: savedComment._id.toString(),
      };

      // Clean up reference
      savedComment = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.log(`New Comment Error=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default newComment;



// 'use server';
// import { commentSchema, connectToDatabase } from '@repo/db';
// import { Types } from 'mongoose';
// import { verifySession } from '@lib/dal';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
//
// export interface INewComment {
//   commentData: {
//     body: string;
//     onDocumentId: string;
//     author: string;
//   };
// }
//
// const newComment = async ({ commentData }: INewComment): Promise<ServerActionResponse<{
//   savedCommentId: string
// } | null>> => {
//   try {
//     if (
//       !commentData?.body ||
//       !commentData?.onDocumentId ||
//       !commentData?.author
//     )
//       return errorResponse({
//         message: 'Something went wrong please try again later',
//       });
//
//     const { isAuth } = await verifySession();
//
//     if (!isAuth) {
//       return errorResponse({
//         message: 'You Need To Log In',
//       });
//     }
//
//     await connectToDatabase('newComment');
//     const commentObject = {
//       body: commentData?.body,
//       onDocumentId: new Types.ObjectId(commentData?.onDocumentId),
//       author: new Types.ObjectId(commentData?.author),
//     };
//
//     const commentObjectToSave = new commentSchema(commentObject);
//     const savedComment = await commentObjectToSave.save();
//     if (!savedComment) {
//       return errorResponse({
//         message: 'Something went wrong please try again later',
//       });
//     }
//
//
//     return successResponse({
//       data: {
//         savedCommentId: savedComment._id.toString(),
//       },
//     });
//
//   } catch (error) {
//     console.log(`New Comment Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default newComment;