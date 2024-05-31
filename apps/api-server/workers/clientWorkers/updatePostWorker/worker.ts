import dotenv from 'dotenv';
import {parentPort, workerData} from 'worker_threads';
import {connectToDatabase} from 'custom-server-util';
import sharp from 'sharp'
import fs from 'fs'
import path from "path";

dotenv.config();

connectToDatabase('client upload post image :').finally();

interface IProps{
    postId:string,
    imageIndex:number
}

const worker = async (workerData:IProps) => {
    try {
        const dev = process.env.NODE_ENV !== 'production';
        const targetPathPrefix = dev ? '../../../../' : '../../../../../';
        const tempPathAddress = `${targetPathPrefix}api-server/public/uploads/posts/${workerData.postId}/temp${workerData.imageIndex}`
        const targetPathAddress = `${targetPathPrefix}api-server/public/uploads/posts/${workerData.postId}/${workerData.imageIndex}.webp`
        const tempPath = path.join(__dirname, tempPathAddress)
        const targetPath = path.join(__dirname, targetPathAddress)
        sharp.cache({files: 0})
        return await sharp(tempPath).webp({nearLossless: true, quality: 50})
            //@ts-ignore
            .resize({width: 640, height: 360, fit: sharp.fit.contain})
            .toFile(targetPath)
            .then(async () => {
                sharp.cache({files: 0})
                try {
                    fs.unlinkSync(tempPath)
                } catch (error) {
                    console.log("tempPath remove file", error)
                }
                return {
                    imageUrl:`/public/uploads/posts/${workerData.postId}/${workerData.imageIndex}.webp`,
                    imageIndex: workerData.imageIndex
                }
            })

    } catch (error) {
        console.log(error)
    }
}

worker(workerData).then(result => {
    parentPort.postMessage(result)
    process.exit()
})