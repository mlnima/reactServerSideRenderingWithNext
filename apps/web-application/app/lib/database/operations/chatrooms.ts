'use cache';
import {
  // connectToDatabase,
  // postSchema,
  chatroomSchema,
  isValidObjectId,
  // metaSchema,
  // flatArrayOdDocumentToObject,
  // flatDocumentToObject,
} from '@repo/db';
import {Chatroom, Meta} from "@repo/typescript-types";
import {Document} from "mongoose";
import connectToDatabase from "@lib/database/databaseConnection";
import {unstable_cacheTag as cacheTag} from "next/cache";

export const getChatroom = async (identifier:string) => {
  try {
    await connectToDatabase('getChatroom')
    const isValidId = isValidObjectId(identifier)

    const currentChatroom = await chatroomSchema
        .findOne(
            isValidId
                ? { _id: identifier }
                : { name: identifier },
        ).select('-messages').lean<Chatroom>({
          virtuals: true,
          transform: (doc:Document) => {
            if (doc._id) {
              doc._id = doc._id.toString();
            }
            return doc;
          },
        })

    let allTheChatrooms = await chatroomSchema
        .find({})
        .select('name')
        .lean()

    allTheChatrooms = allTheChatrooms.map((doc) => {
      if (doc?._id) {
        doc._id = doc._id.toString();
      }
      return doc;
    })
    cacheTag('cacheItem', `CChatroom-${currentChatroom._id}`);
    return { chatroom: currentChatroom, chatrooms: allTheChatrooms }
  } catch (error) {
    console.log('\x1b[33m%s\x1b[0m','getChatroom => ',error );
    return { chatroom: null, chatrooms: null }
  }
};
