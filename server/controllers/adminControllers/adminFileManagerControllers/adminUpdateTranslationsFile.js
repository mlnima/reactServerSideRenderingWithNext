//adminUpdateTranslationsFile


const fs = require("fs");
module.exports = (req, res) => {
    const path = req.body.path;
    const data = req.body.data;

    fs.writeFile(path, data ,  (err)=> {
        if (err ) {
            // fs.writeFile(path, data,{ flag: 'a'},(err)=>{
            //     if (err){
            //         res.json({ message: 'file did not updated',err});
            //         res.end()
            //     }else {
            //         res.json({ message: 'file updated'});
            //         res.end()
            //     }
            //
            // })
        }else {
            res.json({ message: 'file updated'});
            res.end()
        }

    })
}