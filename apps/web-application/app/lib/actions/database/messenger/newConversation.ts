'use server';
import { connectToDatabase, messengerConversationSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IMessengerConversation } from '@repo/typescript-types';

interface INewConversation {
  targetUsers: string[];
}

const newConversation = async ({
  targetUsers,
}: INewConversation): Promise<
  ServerActionResponse<{
    conversationId: string;
  } | null>
> => {
  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth || !userId) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('newConversation');

    const allConversationMember = [...targetUsers, userId];

    const existingConversation = await messengerConversationSchema
      .findOne({
        users: {
          $all: allConversationMember,
          $size: allConversationMember.length,
        },
      })

      .lean<IMessengerConversation>()
      .exec();

    if (existingConversation?._id) {
      return successResponse({
        data: {
          conversationId: existingConversation._id.toString(),
        },
      });
    }

    const conversationDataToSave = new messengerConversationSchema({
      users: allConversationMember,
    });

    let conversation = await conversationDataToSave.save();

    const serializedData = {
      conversationId: conversation._id.toString(),
    };

    conversation = null;

    return successResponse({
      data: serializedData,
    });
  } catch (error) {
    console.error(`newConversation=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default newConversation;
