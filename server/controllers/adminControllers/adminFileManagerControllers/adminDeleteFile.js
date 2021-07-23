const fs = require('fs')

module.exports = (req, res) => {
    const filePath = req.body.filePath;
    fs.unlink(filePath, err => {
        if (err) {
            res.json({error: true, data: 'something happened', type: undefined});
            res.end()
        } else {
            res.json({error: false, data: 'deleted'});
            res.end()
        }
    })
}