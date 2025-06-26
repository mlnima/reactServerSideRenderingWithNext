'use server';
import { connectToDatabase, messengerConversationSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IMessengerConversation } from '@repo/typescript-types';

interface INewConversation {
  targetUsers: string[]
}

const newConversation = async ({ targetUsers }: INewConversation): Promise<ServerActionResponse<{
  conversationId: string
} | null>> => {
  let connection;

  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth || !userId) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    connection = await connectToDatabase('newConversation');
    const session = await connection.startSession();

    try {
      const allConversationMember = [...targetUsers, userId];

      // Check for an existing conversation with the exact same members
      const existingConversation = await messengerConversationSchema
        .findOne({
          users: {
            $all: allConversationMember,
            $size: allConversationMember.length,
          },
        })
        .session(session)
        .lean<IMessengerConversation>();

      // If a conversation already exists, return its ID
      if (existingConversation?._id) {
        return successResponse({
          data: {
            conversationId: existingConversation._id.toString(),
          },
        });
      }

      // If no conversation exists, create a new one
      const conversationDataToSave = new messengerConversationSchema({
        users: allConversationMember,
      });

      let conversation = await conversationDataToSave.save({ session });

      const serializedData = {
        conversationId: conversation._id.toString(),
      };

      // Clean up reference
      conversation = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`newConversation=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default newConversation;


// 'use server';
// import { connectToDatabase, messengerConversationSchema } from '@repo/db';
// import { verifySession } from '@lib/dal';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { IMessengerConversation } from '@repo/typescript-types';
//
// interface INewConversation {
//   targetUsers: string[]
//
// }
//
// const newConversation = async ({ targetUsers }: INewConversation) => {
//   // 'use cache';
//   try {
//     const { isAuth ,userId} = await verifySession();
//
//     if (!isAuth) {
//       return errorResponse({
//         message: 'You Need To Log In',
//       });
//     }
//
//     await connectToDatabase('newConversation');
//
//     const allConversationMember = [...targetUsers,userId];
//
//     let existingConversation = await messengerConversationSchema
//       .findOne({
//         users: {
//           $all: allConversationMember,
//           $size: allConversationMember.length,
//         },
//       }).lean<IMessengerConversation>();
//
//     if (existingConversation && existingConversation?._id) {
//       return successResponse({
//         data: {
//           conversationId: existingConversation._id.toString(),
//         },
//       });
//     }
//
//     const conversationDataToSave = new messengerConversationSchema({
//       users: allConversationMember,
//     });
//
//     const conversation = await conversationDataToSave.save();
//
//     return successResponse({
//       data: {
//         conversationId: conversation._id.toString(),
//       },
//     });
//
//   } catch (error) {
//     console.error(`getUserPagePosts=> `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default newConversation;