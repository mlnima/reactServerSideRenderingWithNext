import fs from "fs-extra";

const createFileIfDoesntExist = async (filePath)=>{
    try {
        await fs.ensureFile(filePath)
    } catch (err) {
        console.error(err)
    }
}

export default createFileIfDoesntExist