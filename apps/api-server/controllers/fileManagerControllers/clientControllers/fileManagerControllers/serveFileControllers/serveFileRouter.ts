import {request} from "express";
import {isValidObjectId} from "mongoose";
import {FileSchema} from "shared-schemas";
import fs from "fs";
import path from "path";

//http://localhost:3000/files/v1/serve/6519824e460e72e975b3597d


const serveFileRouter = async (req, res) => {
    try {
        const fileId = req.params.filename.split('.')[0]
        const isValidId = isValidObjectId(fileId)

        if (!isValidId) {
            res.status(404).json({message: 'File not found'})
            return
        }

        const fileDoc = await FileSchema.findById(fileId)


        if (!fileDoc) {
            res.status(404).json({message: 'File not found'})
            return
        }

        if (fileDoc?.filePath.startsWith('/public/')){
            const fileToAccess= path.join(__dirname, '../../../../', fileDoc?.filePath)
            console.log('fileToAccess=> ',fileToAccess)

            fs.access(fileToAccess, fs.constants.F_OK, (err) => {
                if (err) {
                    return res.status(404).send('File not found');
                }

                // Send the file if it exists
                res.sendFile(fileToAccess);
            });
        }


        console.log('console=> ', fileDoc)


        // res.send('hi')
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

export default serveFileRouter;