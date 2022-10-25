import dotenv from 'dotenv';
import {parentPort, workerData} from 'worker_threads';
import postSchema from '../../../models/postSchema';
import connectToDatabase from '../../../_variables/connectToDatabase';
import mongoose from 'mongoose';

dotenv.config();
connectToDatabase('setMetaThumbnailsAndCount :').finally();


const worker = async (workerData) => {
    try {

    }catch (error){

    }
}


worker(workerData).then(res => {
    parentPort.postMessage(res)
    process.exit(0);
})