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

if (process.env.MAIL_SERVER){
    server.listen(25, process.env.SERVER_IP)
    console.log('mail server started')
}

