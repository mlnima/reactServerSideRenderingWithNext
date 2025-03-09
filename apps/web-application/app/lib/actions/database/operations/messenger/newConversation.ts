'use server';
import { connectToDatabase, messengerConversationSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { IMessengerConversation } from '@repo/typescript-types';

interface INewConversation {
  targetUsers: string[]

}

const newConversation = async ({ targetUsers }: INewConversation) => {
  'use cache';
  try {
    const { isAuth ,userId} = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('newConversation');

    const allConversationMember = [...targetUsers,userId];

    let existingConversation = await messengerConversationSchema
      .findOne({
        users: {
          $all: allConversationMember,
          $size: allConversationMember.length,
        },
      }).lean<IMessengerConversation>();

    if (existingConversation && existingConversation?._id) {
      return successResponse({
        data: {
          conversationId: existingConversation._id.toString(),
        },
      });
    }

    const conversationDataToSave = new messengerConversationSchema({
      users: allConversationMember,
    });

    const conversation = await conversationDataToSave.save();

    return successResponse({
      data: {
        conversationId: conversation._id.toString(),
      },
    });

  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default newConversation;