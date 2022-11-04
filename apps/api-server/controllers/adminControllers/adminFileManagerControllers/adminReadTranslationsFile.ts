import fs from 'fs';

const adminReadTranslationsFile = (req, res) => {
    const path = req.body.path;
    try {
        fs.readFile(path, (error, fileData) => {
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
