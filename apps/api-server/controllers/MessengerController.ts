import { Request, Response } from 'express';

import { reqQueryToMongooseOptions } from '@util/database-util';
import { messengerConversationSchema } from '@repo/db';

class MessengerController {
  static async getMessages(req: Request, res: Response) {
    try {
      const conversationData = await messengerConversationSchema
        .findById(req.query.conversationId)
        .select('messages')
        .populate([
          //@ts-ignore
          {
            path: 'messages',
            model: 'messengerConversationMessage',
            options: {
              sort: { createdAt: -1 },
              limit: req.query.limit || 10,
              skip: req.query.skip || 0,
            },
          },
        ])
        .exec();

      res.json({ messages: conversationData?.messages || [] });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async getConversations(req: Request, res: Response) {
    try {
      const conversationsList = await messengerConversationSchema
        .find({ users: { $in: [req.userData._id] } }, { messages: { $slice: -1 } }, reqQueryToMongooseOptions(req))

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
        .exec();

      res.json({ conversationsList });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async getConversation(req: Request, res: Response) {
    try {
      const conversation = await messengerConversationSchema
        .findOne({ $and: [{ _id: { $in: req.query?._id } }, { users: { $in: [req.userData._id] } }] })
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
        ])
        .exec();

      res.json({ conversation });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async newConversation(req: Request, res: Response) {
    try {
      const existingConversation = await messengerConversationSchema
        .findOne({
          users: {
            $all: req.body.users,
            $size: req.body.users.length,
          },
        })
        .exec();

      if (existingConversation) {
        res.status(200).json({ conversation: existingConversation });
      } else {
        const conversationDataToSave = new messengerConversationSchema({
          users: req.body?.users,
        });
        const conversation = await conversationDataToSave.save();
        res.status(200).json({ conversation });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Something Went Wrong' });
    }
  }
}

export default MessengerController;

//            const limit = parseInt(multiQueryUniquer(req.query.limit)) || 20;
//             const skip = parseInt(multiQueryUniquer(req.query.skip)) || 0;
//             .limit(limit)
//                 .skip(skip)
//.sort({updatedAt: -1})
