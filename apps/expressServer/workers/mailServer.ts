import SMTPServer from 'smtp-server';
import parser from 'mailparser';

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

if (process.env.MAIL_SERVER ==='true'){
    server.listen(process.env.MAIL_SERVER_PORT || 465, ()=>{
        console.log('mail expressServer started')
    })
}


