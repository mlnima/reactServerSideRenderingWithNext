const http = require('http');
const fs = require('fs');

module.exports = async (url, dest)=> {
console.log(dest)
    try {
        const file = fs.createWriteStream(dest);
        await http.get(url, async (response)=> {
           await response.pipe(file);
           await file.on('finish', function() {
                // file.close(cb);
                return dest
            });

        }).on('error', (err)=> {
            console.log('16',err)
            fs.unlink(dest)
            return url
        });

    }catch (err){
        return url
    }

};