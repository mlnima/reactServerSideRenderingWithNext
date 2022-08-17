
require('dotenv').config()
require('../../../../_variables/connectToDatabase')
// const {parentPort, workerData} = require("worker_threads");
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