'use server';

import { connectToDatabase, messengerConversationSchema } from '@repo/db';
import { jwtValidator } from '@repo/utils-server';
import { JWTPayload } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { TToken } from '@repo/typescript-types/src/User';

interface IGetConversation{
  conversationId: string,
  token:TToken
}

interface IGetConversations{
  token:TToken,
  limit?:number,
  skip:number
}

interface INewConversation{
  token:TToken,
  users:string[]
}

interface IGetConversationMessages{
  token:TToken,
  limit?:number,
  skip:number,
  conversationId: string
}

export const getConversation = async ({ conversationId,token }:IGetConversation) => {
  'use cache';
  try {
    if(!conversationId || !token){
      return null
    }
    const tokenData  = await jwtValidator(token) as JWTPayload

    if(!tokenData || !tokenData?._id){
      return null
    }

    await connectToDatabase('getConversation');

    const conversation = await messengerConversationSchema
      .findOne({ $and: [{ _id: { $in: conversationId } }, { users: { $in: [tokenData?._id] } }] })
      .select('users messages')
      .populate([
        {
          path: 'users',
          select: ['username', 'profileImage'],
          populate: {
            path: 'profileImage',
            model: 'file',
          },
        },
        {
          path: 'messages',
          model: 'messengerConversationMessage',
          options: { sort: { createdAt: -1 }, limit: 10 },
        },
      ]).lean()

    if (!conversation){
      return null
    }
    cacheTag('cacheItem', `CGetConversation-${conversationId}`);
    return JSON.parse(JSON.stringify(conversation))
  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return null
  }
};

export const getConversations = async ({ token,limit = 10,skip = 0 }:IGetConversations) => {
  'use cache';
  try {
    if(!token){
      return null
    }
    const tokenData  = await jwtValidator(token) as JWTPayload

    if(!tokenData || !tokenData?._id){
      return null
    }

    await connectToDatabase('getConversation');

    const conversationsList = await messengerConversationSchema
      .find({ users: { $in: [tokenData._id] } }, { messages: { $slice: -1 } },{limit,skip})

      .select('users updatedAt messages')

      .populate([
        {
          path: 'users',
          select: ['username', 'profileImage'],
          populate: {
            path: 'profileImage',
            model: 'file',
          },
        },
        {
          path: 'messages',
          model: 'messengerConversationMessage',
          options: { sort: { createdAt: -1 }, limit: 1 },
        },
      ])

    cacheTag('cacheItem', `CGetConversations-${tokenData._id}`);
    return JSON.parse(JSON.stringify(conversationsList))
  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return null
  }
};

export const getConversationMessages = async ({ token,limit = 10,skip = 0,conversationId }:IGetConversationMessages) => {
  'use cache';
  try {
    if(!token){
      return null
    }
    const tokenData  = await jwtValidator(token) as JWTPayload

    if(!tokenData || !tokenData?._id){
      return null
    }

    await connectToDatabase('getConversationMessages');

    const conversationData = await messengerConversationSchema
      .findById(conversationId)
      .select('messages')
      .populate([
        //@ts-ignore
        {
          path: 'messages',
          model: 'messengerConversationMessage',
          options: {
            sort: { createdAt: -1 },
            skip,
            limit
          },
        },
      ])

    cacheTag('cacheItem', `CGetConversations-${tokenData._id}`);
    return JSON.parse(JSON.stringify(conversationData?.messages))
  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return null
  }
};

export const newConversation = async ({ token,users }:INewConversation) => {
  'use cache';
  try {
    if(!token){
      return null
    }
    const tokenData  = await jwtValidator(token) as JWTPayload;

    if(!tokenData || !tokenData?._id){
      return null
    }

    await connectToDatabase('newConversation');

    const existingConversation = await messengerConversationSchema
      .findOne({
        users: {
          $all: users,
          $size: users.length,
        },
      })

    if (existingConversation){
      return JSON.parse(JSON.stringify(existingConversation))
    }

    const conversationDataToSave = new messengerConversationSchema({
      users: users,
    });

    const conversation = await conversationDataToSave.save();

    cacheTag('cacheItem', `CGetConversations-${tokenData._id}`);
    return JSON.parse(JSON.stringify(conversation))
  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return null
  }
};

export const deleteConversation = async ({ token,_id }:INewConversation) =>{
//clientAPIRequestDeleteConversation
}