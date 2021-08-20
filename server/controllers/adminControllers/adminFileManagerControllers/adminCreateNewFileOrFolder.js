//adminCreateNewFileOrFolder

const fs = require('fs')

module.exports = (req, res) => {
    const Path = req.body.Path === '.' ? './': req.body.Path;
    const fileFolderName = req.body.fileFolderName;
    const type = req.body.type;

    console.log(Path,fileFolderName,type)
    if (type==='file'){
        fs.writeFile(Path + '/' +fileFolderName, '',  (err) => {
            if (err){
                console.log(err)

            }else {

            }
        });
    }else {
        fs.mkdirSync(Path + '/' +fileFolderName)

    }
    res.end()

}