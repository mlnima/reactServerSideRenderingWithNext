const fs = require('fs')
const fsExtra = require('fs-extra')
let fileManagerControllers = {}

fileManagerControllers.readPath = (req, res) => {
    const path = req.body.path;
 console.log(path )
    fs.readdir(path, (err, data) => {
        if (err) {
            if (err.code === 'ENOTDIR') {
                fs.readFile(path, (err, fileData) => {
                    if (err) {
                        res.json({error: true, data: [], type: undefined});
                        res.end()
                    } else {
                        res.json({error: true, data: fileData.toString('utf8'), type: 'file'});
                        res.end()
                    }
                })
            } else {
                res.json({error: true, data: [], type: undefined});
                res.end()
            }

        } else {
            res.json({error: false, data, type: 'dir'});
            res.end()
        }
    })

};

module.exports = fileManagerControllers
// fileManagerController.
// fileManagerController.
// fileManagerController.
// fileManagerController.
// fileManagerController.