'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, userSchema } from '@repo/db';
import { User } from '@repo/typescript-types';
import { isValidObjectId } from 'mongoose';
import { unstable_cacheTag as cacheTag } from 'next/cache';

interface IArg {
  keyword: string;
}

const getUsersSuggestionList = async ({ keyword }: IArg) => {
  try {
    "use cache"
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
      if (user){
        cacheTag('cacheItem', `CUUsersSuggestionList-${keyword}`);
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
      cacheTag('cacheItem', `CUUsersSuggestionList-${keyword}`);
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