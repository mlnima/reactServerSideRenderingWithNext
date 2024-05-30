import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';
connectToDatabase('SetImagesToFileCollection');
import mongoose from "mongoose";
import {ConversationSchema, FileSchema, PostSchema, UserSchema} from 'shared-schemas';
import * as process from "process";
import {MessengerConversationMessageSchema,MessengerConversationSchema} from "shared-schemas";

const imageSaver = async (imageData) => {
    try {
        //@ts-ignore
        const ImageToSave = new FileSchema(imageData);
        //@ts-ignore
        return await ImageToSave.save();
    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
};


const setPostImagesToFileCollection = async () => {
    try {
        const postWithWrongImagesData = await PostSchema.find({images: {$exists: true, $type: 'array', $ne: []}});

        for await (const post of postWithWrongImagesData) {
            let newPostData = {...post._doc};
            const cleanedArray = newPostData.images.filter(item => item !== null && item !== undefined);

            const processImage = async (image) => {
                if (!mongoose.isValidObjectId(image) && typeof image === 'string') {
                    //@ts-ignore
                    const ImageToSave = new FileSchema({
                        usageType: 'post',
                        filePath: image
                    });

                    const savedFile = await ImageToSave.save();
                    if (savedFile) {
                        return savedFile._id;
                    }
                } else if (!mongoose.isValidObjectId(image) && typeof image === 'object' && !!image.imagePath) {
                    //@ts-ignore
                    const ImageToSave = new FileSchema({
                        usageType: 'post',
                        filePath: image?.imagePath
                    });

                    const savedFile = await ImageToSave.save();
                    if (savedFile) {
                        return savedFile._id;
                    }
                } else if (mongoose.isValidObjectId(image)) {
                    return image;
                }
                return null;
            };

            const imagePromises = cleanedArray.map(image => processImage(image));
            const newImagesArray = await Promise.all(imagePromises);
            const filteredNewImagesArray = newImagesArray.filter(image => image !== null);
            await PostSchema.findByIdAndUpdate(post._id, {$set: {images: filteredNewImagesArray}});
        }
    } catch (error) {
        console.log(error);
    }
};


const setUserImagesToFileCollection = async () => {
    try {
        const usersWithWrongImagesData = await UserSchema.find({
            profileImage: {
                $exists: true,
                $type: 'string',
                $ne: ''
            }
        });

        for await (const user of usersWithWrongImagesData) {
            //@ts-ignore
            let newUserData = {...user._doc};
            if (!mongoose.isValidObjectId(newUserData.profileImage) && typeof newUserData.profileImage === 'string') {
                const newProfileImageData = await imageSaver({
                    usageType: 'user',
                    filePath: newUserData.profileImage
                })
                await UserSchema.findByIdAndUpdate(user._id, {$set: {profileImage: newProfileImageData._id}}).exec()
            }
        }

        console.log(usersWithWrongImagesData)

    } catch (error) {

    }
}


const fixUserConversationMessages = async () => {
    try {
        const conversations = await ConversationSchema.find({}).exec();

        for await (const conversation of conversations) {
            const newConversationDataToSave = {
                users: conversation.users,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt,
                messages: []
            };

            const newConversation = new MessengerConversationSchema(
                newConversationDataToSave
            );

            const savedConversation = await newConversation.save();

            for await (const message of conversation.messages) {
                const newDataForMessage = new MessengerConversationMessageSchema({
                    conversation:savedConversation._id,
                    sender: message.author,
                    receiver: conversation.users.find(
                        (user) => user.toString() !== message?.author?.toString()
                    ),
                    type: 'privateMessage',
                    content: message?.messageBody || '',
                    createdAt: message?.createdAt,
                    isRead: true,
                });

                try {

                    const savedMessage = await newDataForMessage.save();
                    console.log(savedMessage._id,'saved message');

                    await MessengerConversationSchema.findByIdAndUpdate(savedConversation._id, { $push: { messages: savedMessage._id } },{timestamps:false}).exec();
                    console.log(savedMessage._id,'pushed to ',savedConversation._id);


                    console.log('deleting the old message');
                    await ConversationSchema
                        .findByIdAndUpdate(conversation._id, {
                            $pull: { messages: { _id: message._id } },
                        },{timestamps:false})
                        .exec();


                } catch (err) {
                    console.log(err);
                }

                console.log('data which will be set', newConversationDataToSave);
            }

            for await (const userId of conversation.users){
                await UserSchema.findByIdAndUpdate(userId,{$pull:{conversations:conversation._id}}).exec();
            }
            //removing the old conversation
            await ConversationSchema.findByIdAndDelete(conversation._id).exec();
        }

        //drop the old collection
       await ConversationSchema.collection.drop();
    } catch (e) {
        console.log('Error fetching conversations:', e);
    }
};


const fixChanges = async () => {
    try {
        // await setPostImagesToFileCollection()
        // await setUserImagesToFileCollection()
        await fixUserConversationMessages().finally(() => process.exit(0))
    } catch (error) {
        console.log(error)
    }

}

fixChanges();





