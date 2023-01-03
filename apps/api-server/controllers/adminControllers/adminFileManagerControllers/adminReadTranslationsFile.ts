import fs from 'fs';
import path from "path";

const adminReadTranslationsFile = (req, res) => {
    const filePath = req.body.path.replace('./','/');
    const targetPath = path.join(__dirname , `../../../../web-app${filePath}`)

    try {
        fs.readFile(targetPath, (error, fileData) => {
            if (error) {
                console.log(error)
                res.json({error: true, data: '', type: undefined});
            } else {
                res.json({error: false, data: fileData.toString('utf8'), type: 'file'});
            }
        })
    }catch (error){
        console.log(error)
    }

}

export default adminReadTranslationsFile;
