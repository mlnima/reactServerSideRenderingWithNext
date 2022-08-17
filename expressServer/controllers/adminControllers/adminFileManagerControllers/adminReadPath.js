const fs = require('fs')

module.exports = (req, res) => {
    const path = req.body.path;
    fs.readdir(path, (err, data) => {
        if (err) {
            if (err.code === 'ENOTDIR') {
                fs.readFile(path, (err, fileData) => {
                    if (err) {
                        res.json({error: true, data: [], type: undefined});
                    } else {
                        res.json({error: true, data: fileData.toString('utf8'), type: 'file'});
                    }
                })
            } else {
                res.json({error: true, data: [], type: undefined});
            }

        } else {
            res.json({error: false, data, type: 'dir'});
        }
    })

};