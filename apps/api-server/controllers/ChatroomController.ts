// @ts-nocheck
import { Request, Response } from 'express';

import { messengerConversationSchema, chatroomSchema, chatroomMessageSchema } from '@repo/db';
import getChatrooms from './adminControllers/chatrooms/getChatrooms';

import createChatroom from './adminControllers/chatrooms/createChatroom';
import deleteChatroom from './adminControllers/chatrooms/deleteChatroom';
import updateChatroom from './adminControllers/chatrooms/updateChatroom';
import deleteChatroomMessage from './adminControllers/chatrooms/deleteChatroomMessage';
import { mongoIdValidator } from '@util/data-validators';

class ChatroomController {
  static async loadOlderMessages(req: Request, res: Response) {
    try {
      const conversationData = await messengerConversationSchema
        .findById(req.query.conversationId)
        .select('messages')
        .populate([
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
      res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async getConversationsList(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const skip = parseInt(req.query.skip) || 0;

      const conversationsList = await messengerConversationSchema
        .find({ users: { $in: [req.userData._id] } }, { messages: { $slice: -1 } })
        .limit(limit)
        .skip(skip)
        .select('users updatedAt messages')
        .sort({ updatedAt: -1 })
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
      res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async getAConversation(req: Request, res: Response) {
    try {
      const conversation = await messengerConversationSchema
        .findOne({ $and: [{ _id: { $in: req.query?.conversationId } }, { users: { $in: [req.userData._id] } }] })
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
      res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async startAConversation(req: Request, res: Response) {
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
      res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async getChatroom(req: Request, res: Response) {
    try {
      const isValidId = mongoIdValidator(req.query.identifier);
      const currentChatroom = await chatroomSchema
        .findOne(isValidId ? { _id: req.query.identifier } : { name: req.query.identifier })
        .exec();
      const allTheChatrooms = await chatroomSchema.find({}).select('name').exec();

      res.json({ chatroom: currentChatroom, chatrooms: allTheChatrooms });
    } catch (error) {
      console.error('Error fetching chatrooms:', error);
      res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  //---------------------Dashboard--------------------

  static async dashboardGetChatrooms(req: Request, res: Response) {
    const totalCount = await chatroomSchema.countDocuments({}).exec();
    await chatroomSchema
      .find({})
      .exec()
      .then((chatrooms) => {
        res.json({ chatrooms, totalCount });
      })
      .catch((error) => {
        console.log(error);
        res.end();
      });
  }

  static async dashboardGetChatroom(req: Request, res: Response) {
    try {
      const chatroom = await chatroomSchema.findById(req.query._id).exec();
      if (!chatroom) {
        res.end();
      }
      res.json({ chatroom });
    } catch (error) {}
  }

  static async dashboardCreateChatroom(req: Request, res: Response) {
    try {
      const chatroomData = req.body.data;
      const dataToSave = new chatroomSchema(chatroomData);
      const saveChatroom = await dataToSave.save();
      res.json({ chatroom: saveChatroom });
    } catch (error) {
      res.end();
    }
  }

  static async dashboardDeleteChatroom(req: Request, res: Response) {
    await chatroomSchema
      .findByIdAndDelete(req.query._id)
      .exec()
      .then(() => {
        res.json({ message: 'deleted' });
      })
      .catch((error) => {
        console.log(error);
        res.end();
      });
  }

  static async dashboardUpdateChatroom(req: Request, res: Response) {
    await chatroomSchema
      .findByIdAndUpdate(req.body.data._id, req.body.data, { new: true })
      .exec()
      .then((chatroom) => {
        res.json({ chatroom });
      })
      .catch((error) => {
        console.log(error);
        res.end();
      });
  }

  //might be not for dashboard
  static async dashboardDeleteMessage(req: Request, res: Response) {
    try {
      await chatroomMessageSchema.findByIdAndRemove(req.query.messageId, { useFindAndModify: false }).exec();
      res.end();
    } catch (error) {
      res.end();
    }
  }
}

export default ChatroomController;
