import fs from 'fs';
import path from "path";

const adminUpdateTranslationsFile = (req, res) => {

    try{
        const filePath = req.body.path.replace('./','/');
        const targetPath = path.join(__dirname , `../../../../web-app${filePath}`)
        const data = req.body.data;


        fs.writeFile(targetPath, data, (err) => {
            if (err) {

            } else {
                res.json({message: 'file updated'});

            }

        })
    }catch (error){
        console.log(error)
    }

}

export default adminUpdateTranslationsFile