const SMTPServer = require("smtp-server").SMTPServer;
const parser = require("mailparser").simpleParser

const server = new SMTPServer({
    onData(stream, session, callback) {
        parser(stream, {}, (err, parsed) => {
            if (err) console.log("Error:" , err)

            console.log(parsed)

            stream.on("end", callback)
        })

    },
    disabledCommands: ['AUTH']
});

// if (process.env.MAIL_SERVER){
//     server.listen(25, process.env.SERVER_IP).then(()=>{
//         console.log('mail server started')
//     }).catch(err=>{
//         console.log('cant start the mail server')
//     })
//
// }
if (process.env.MAIL_SERVER){
    server.listen(25, ()=>{
        console.log('mail server started')
    })
}

