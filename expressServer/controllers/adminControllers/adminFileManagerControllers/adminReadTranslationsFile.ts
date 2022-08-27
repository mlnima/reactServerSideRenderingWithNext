import fs from 'fs';

const adminReadTranslationsFile = (req, res) => {
    const path = req.body.path;
    fs.readFile(path, (err, fileData) => {
        if (err) {
           console.log(err)
            res.json({error: true, data: '', type: undefined});
        } else {
            res.json({error: false, data: fileData.toString('utf8'), type: 'file'});
        }
    })
}

export default adminReadTranslationsFile;
