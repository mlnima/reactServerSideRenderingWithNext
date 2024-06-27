// @ts-nocheck
import {Request, Response} from "express";
import messengerConversationSchema from "@schemas/messengerConversationSchema";

class MessengerController{
    static async loadOlderMessages(req: Request, res: Response){
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
                            sort: {createdAt: -1},
                            limit: req.query.limit || 10,
                            skip:req.query.skip || 0
                        }
                    },
                ])
                .exec();

            res.json({messages:conversationData?.messages||[]});
        } catch (err) {
            console.log(err);
            res.status(500);
        }
    };
    static async getConversationsList(req: Request, res: Response){
        try {
            const limit = parseInt(req.query.limit) || 20;
            const skip = parseInt(req.query.skip) || 0;

            const conversationsList = await messengerConversationSchema
                .find({users: {$in: [req.userData._id]}}, {messages: {$slice: -1}})
                .limit(limit)
                .skip(skip)
                .select('users updatedAt messages')
                .sort({updatedAt: -1})
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
                        options: {sort: {createdAt: -1}, limit: 1}

                    },
                ])
                .exec();

            res.json({conversationsList});
        } catch (err) {
            console.log(err);
            res.status(500);
        }
    };
    static async getAConversation(req: Request, res: Response){
        try {

            const conversation = await messengerConversationSchema
                .findOne({$and:[{ _id: { $in: req.query?.conversationId } },{ users: { $in: [req.userData._id] } }]})
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
                        model:'messengerConversationMessage',
                        options: { sort: { createdAt: -1 }, limit: 10 }
                    },
                ])
                .exec();

            res.json({ conversation });
        } catch (err) {
            console.log(err);
            res.status(500);
        }
    };
    static async startAConversation(req: Request, res: Response){
        try {

            const existingConversation = await messengerConversationSchema.findOne({
                users: {
                    $all: req.body.users,
                    $size: req.body.users.length
                }
            }).exec();

            if (existingConversation) {
                res.status(200).json({conversation: existingConversation})
            }else{
                const conversationDataToSave = new messengerConversationSchema({
                    users: req.body?.users
                })
                const conversation = await conversationDataToSave.save();
                res.status(200).json({conversation})
            }

        } catch (error) {
            res.status(500)
        }
    }
}

export default MessengerController