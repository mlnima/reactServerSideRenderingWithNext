require('dotenv').config({path: '../../../.env'})
const nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

console.log('process.env.MAIL_SERVER_HOST=> ',process.env.MAIL_SERVER_HOST)
console.log('JWT_KEY=> ',process.env.JWT_KEY)

const connectionOptions={
   host: process.env.MAIL_SERVER_HOST,
    port: 587,
    secure: false,
}

const authOption = {
    user: 'welcome',
    pass: process.env.JWT_KEY,
}

let connection = new SMTPConnection(connectionOptions);

connection.connect((error) => {
    try {
        if (error) {
            console.log("Connection Error: ", error);
        } else {
            console.log('Connected. Secure:', connection?.secure);
            connection.login(authOption, (err) => {
                if(err) {
                    console.log("Login Error: ", err);
                } else {
                    const envelope = {
                        from: 'welcome@trdland.de',
                        to: 'mmlnima@gmail.com',
                    }

                    connection.send(envelope, '<p>Thank you for registering on MyApp.</p>', (err, info) => {
                        if(err){
                            console.log("Sending Error: ", err);
                        }
                        console.log(info);
                        connection.quit();
                    });
                }
            });
        }
    }catch (error) {
        console.log("Connection Error: ", error);
    }

});


// const message = {
//     subject: 'Welcome to MyApp!',
//     text: 'Thank you for registering on MyApp.',
//     html: '<p>Thank you for registering on MyApp.</p>',
// };