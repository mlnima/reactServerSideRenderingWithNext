'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, userSchema } from '@repo/db';
import { User } from '@repo/typescript-types';
import { isValidObjectId } from 'mongoose';

interface IArg {
  keyword: string;
}

const getUsersSuggestionList = async ({ keyword }: IArg) => {
  try {

    if (!keyword) {
      return errorResponse({
        message: 'No keyword was provided',
      });
    }

    await connectToDatabase('dashboardGetUser');

    const isMongoObjectId = isValidObjectId(keyword)
    const selectedFields = ['username']

    if (isMongoObjectId){
      const user = await userSchema.findById(keyword)
        .select(selectedFields)
        .exec()
      if (user){
        return successResponse({
          data: {
            users: JSON.parse(JSON.stringify([user])),
          },
        });
      }else {
        return errorResponse({
          message: 'user not found',
        });
      }
    }else{
      const users = await userSchema.find({
        username: {
          $regex: '^' + keyword,
          $options: 'i',
        },
      }).limit(20).lean<User>()

      return successResponse({
        data: {
          users: JSON.parse(JSON.stringify(users)),
        },
      });
    }



  } catch (error) {
    console.log(`error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default getUsersSuggestionList;