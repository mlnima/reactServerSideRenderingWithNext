//uploadProfileImage
import {getCurrentDatePath} from "@util/path-utils";
import fsExtra from "fs-extra";

import path from "path";
import {isValidObjectId} from "mongoose";
import userSchema from "@schemas/userSchema";
import fileSchema from "@schemas/fileSchema";

const deletePreviousProfileImage = async (userId: string) => {
    try {
        const userData = await userSchema.findById(userId).select('profileImage').exec()
        if (isValidObjectId(userData?.profileImage)) {
            try {
                const profileImageDocument = await fileSchema.findById(userData?.profileImage).exec()
                console.log('profileImageDocument=> ', profileImageDocument)
                if (!profileImageDocument?.filePath.includes('http')) {
                    await fsExtra.unlink(path.join(__dirname, '../../../../', profileImageDocument.filePath));
                    await fileSchema.findByIdAndDelete(userData?.profileImage).exec();
                }
            } catch (error) {
                console.log('error=> ', error)
            }
//@ts-ignore
        } else if (!!userData?.profileImage && !isValidObjectId(userData?.profileImage) && !userData?.profileImage?.includes('http')) {
            try {
                //@ts-ignore
                await fsExtra.unlink(path.join(__dirname, '../../../../', userData?.profileImage));
            } catch (error) {
                console.log('error=> ', error)
                return
            }
        }

        if (!!userData?.profileImage) {
            await userSchema.findByIdAndUpdate(userId, {$unset: {profileImage: 1}}).exec()
        }

        return

    } catch (error) {
        console.log('error=> ', error)
        return
    }
}

const uploadProfileImage = async (req, res) => {
    try {

        const userData = req.userData
        await deletePreviousProfileImage(userData._id)
        const imagesData = JSON.parse(req.body?.imagesData || '{}')
        const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]
        const image = images[0]
        const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;
        await fsExtra.ensureDir(directoryPath);

        try {
            // creating a empty file document
            const emptyFileDocument = new fileSchema({
                usageType: imagesData.usageType,
                filePath: 'temp',
                mimeType: image.mimetype,
            })

            const savedEmptyDoc = await emptyFileDocument.save()
            const filePath = `/public/uploads/images/${getCurrentDatePath()}/${savedEmptyDoc?._id}.webp`
            await image.mv('.' + filePath)
            const updatedImageDoc = await fileSchema.findByIdAndUpdate(savedEmptyDoc?._id, {filePath}, {new: true}).exec()
            await userSchema.findByIdAndUpdate(userData._id, {profileImage: updatedImageDoc?._id}, {new: true}).exec()
            res.status(200).json({newProfileImage: filePath})
            return
        } catch (error) {
            console.log('saving images', error)
            res.status(500).json({error})
            return
        }
    } catch (error) {
        console.log('Upload Post Images:', error)
        res.status(500).json({error})
        return
    }
}

export default uploadProfileImage;