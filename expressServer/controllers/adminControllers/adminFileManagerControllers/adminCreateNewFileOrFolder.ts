import fs from 'fs';

const adminCreateNewFileOrFolder = (req, res) => {
    const Path = req.body.Path === '.' ? './' : req.body.Path;
    const fileFolderName = req.body.fileFolderName;
    const type = req.body.type;

    if (type === 'file') {
        fs.writeFile(Path + '/' + fileFolderName, '', (err) => {
            if (err) {
                console.log(err)

            } else {

            }
        });
    } else {
        fs.mkdirSync(Path + '/' + fileFolderName)

    }
    res.end()

}

export default adminCreateNewFileOrFolder;