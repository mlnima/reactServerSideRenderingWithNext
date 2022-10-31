import dotenv from 'dotenv';
import {parentPort, workerData} from 'worker_threads';
import connectToDatabase from 'custom-server-util/src/connectToDatabase';
import sharp from 'sharp'
import fs from 'fs'
import path from "path";
dotenv.config();

connectToDatabase('client upload post image :').finally();

const worker = async (workerData) => {
    try {
        const tempPath = path.join(__dirname, `../../../../public/uploads/posts/${workerData.postId}/temp`)
        const targetPath = path.join(__dirname, `../../../../public/uploads/posts/${workerData.postId}/${workerData.imageIndex}.webp`)
        sharp.cache({files:0})
        return await sharp(tempPath).webp({lossless: true})
            .resize({width: 640, height: 360, fit: sharp.fit.contain})
            .toFile(targetPath)
            .then(async () => {
                sharp.cache({files:0})
                try {
                    await fs.unlinkSync(tempPath)
                } catch (error) {
                    console.log("tempPath remove file", error)
                }
                return {
                        imageIndex:workerData.imageIndex,
                        imagePath:`/public/uploads/posts/${workerData.postId}/${workerData.imageIndex}.webp`
                    }
            })
    } catch (error) {
        console.log(error)
        // return null
    }
}

worker(workerData).then(result => {
    // console.log('worker result:',result)
    parentPort.postMessage(result)
    process.exit()
})