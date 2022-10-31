import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from 'custom-server-util/src/connectToDatabase';
connectToDatabase('worker getPosts')
import  {parentPort, workerData} from 'worker_threads'


const getPostsWorker = async (data)=>{

    console.log(data)
    return 'worker is fine'
    // parentPort.postMessage(query)
}


getPostsWorker(workerData).then(result=>{
    parentPort.postMessage(result)
})



// export default getPostsWorker