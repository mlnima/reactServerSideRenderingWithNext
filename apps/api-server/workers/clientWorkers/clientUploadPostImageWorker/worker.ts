import dotenv from 'dotenv';
import {parentPort, workerData} from 'worker_threads';
import {connectToDatabase} from '@util/database-util';
import sharp from 'sharp'
import fs from 'fs'
import path from "path";
dotenv.config();

connectToDatabase().finally();

interface IProps{
    postId:string,
    imageIndex:number
}

const worker = async (workerData:IProps) => {
    try {
        const dev = process.env.NODE_ENV !== 'production';
        const tempPathAddress = `../../../../${dev ? '' : '../'}api-server/public/uploads/posts/${workerData.postId}/temp`
        const targetPathAddress = `../../../../${dev ? '' : '../'}api-server/public/uploads/posts/${workerData.postId}/${workerData.imageIndex}.webp`
        const tempPath = path.join(__dirname, tempPathAddress)
        const targetPath = path.join(__dirname, targetPathAddress)
        sharp.cache({files:0})
        return await sharp(tempPath).webp({lossless: true})
            //@ts-ignore
            .resize({width: 640, height: 360, fit: sharp.fit.contain})
            .toFile(targetPath)
            .then(async () => {
                sharp.cache({files:0})
                try {
                    fs.unlinkSync(tempPath);
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