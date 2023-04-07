import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import {fileSchema, postSchema, userSchema} from 'models';
import {connectToDatabase} from 'custom-server-util';
import mongoose from "mongoose";




connectToDatabase('SetImagesToFileCollection');

const imageSaver = async (imageData) => {
    try {
        //@ts-ignore
        const ImageToSave = new fileSchema(imageData);
        return await ImageToSave.save();
    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
};


const setPostImagesToFileCollection = async () => {
    try {
        const postWithWrongImagesData = await postSchema.find({images: {$exists: true, $type: 'array', $ne: []}});

        for await (const post of postWithWrongImagesData) {
            let newPostData = {...post._doc};
            const cleanedArray = newPostData.images.filter(item => item !== null && item !== undefined);

            const processImage = async (image) => {
                if (!mongoose.isValidObjectId(image) && typeof image === 'string') {
                    //@ts-ignore
                    const ImageToSave = new fileSchema({
                        usageType: 'post',
                        filePath: image
                    });

                    const savedFile = await ImageToSave.save();
                    if (savedFile) {
                        return savedFile._id;
                    }
                } else if (!mongoose.isValidObjectId(image) && typeof image === 'object' && !!image.imagePath) {
                    //@ts-ignore
                    const ImageToSave = new fileSchema({
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
            await postSchema.findByIdAndUpdate(post._id, {$set: {images: filteredNewImagesArray}});
        }
    } catch (error) {
        console.log(error);
    }
};


const setUserImagesToFileCollection = async () => {
    try {
        const usersWithWrongImagesData = await userSchema.find({
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
                await userSchema.findByIdAndUpdate(user._id, {$set: {profileImage: newProfileImageData._id}}).exec()
            }
        }

        console.log(usersWithWrongImagesData)

    } catch (error) {

    }


}


const setImagesToFileCollection = async () => {
    try {
        // await setPostImagesToFileCollection()
        await setUserImagesToFileCollection()
    } catch (error) {
        console.log(error)
    }

}

setImagesToFileCollection();

// connectToDatabase().then(() => {
//     setImagesToFileCollection();
// }).catch((error) => {
//     console.error('Error connecting to database:', error);
// });





