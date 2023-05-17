// @ts-nocheck
import {parentPort, workerData} from 'worker_threads';
// import dotenv from 'dotenv';
// dotenv.config();


import sharp from 'sharp'
import fs from 'fs'
import path from "path";
import {getCurrentDatePath} from "custom-server-util";

interface WorkerDataTypes{
    tempPath:string,
    fileName:string,
    width?:number,
    height?:number,
    dev:boolean
}

const worker = async ({tempPath,width,height,fileName,dev}:WorkerDataTypes) => {
    try {

        const targetPathPrefix = dev ? '../../../../' : '../../../../../';
        const targetPathAddress = `${targetPathPrefix}file-server/public/uploads/images/${getCurrentDatePath()}/${fileName}.webp`
        const targetPath = path.join(__dirname, targetPathAddress)
        sharp.cache({files: 0})

        return await sharp(tempPath).webp({nearLossless: true, quality: 50})
            .resize({width: width || 640, height: height || 480, fit: sharp.fit.contain})
            .toFile(targetPath)
            .then(async () => {
                sharp.cache({files: 0})
                try {
                    await fs.unlinkSync(tempPath)
                } catch (_) {}
                return {
                    imageUrl:`/public/uploads/images/${getCurrentDatePath()}/${fileName}.webp`,
                }
            })

    } catch (error) {
        console.log('worker error:',error)
        return null
    }
}

worker(workerData).then(result => {
    parentPort.postMessage(result)
    process.exit()
})