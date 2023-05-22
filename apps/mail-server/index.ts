import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';
connectToDatabase('Mail Server')
import {SMTPServer} from 'smtp-server';
import {simpleParser} from 'mailparser';
import nodemailer from 'nodemailer';
import fs from 'fs';
import {emailSchema, settingSchema, userSchema} from 'models';
import bcrypt from 'bcryptjs';
import emailActionTypeDetector from "./src/utils/emailActionTypeDetector";
import * as process from "process";

interface IExternalMailSender {
    email: {
        from: string,
        to: string,
        subject: string,
        text: string,
        html: string,
    },
    user: string,
    port: number
}

const externalMailSender = async ({email, user, port}: IExternalMailSender) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER_HOST,
        port,
        secure: false,

        auth: {
            user,
            pass: process.env.JWT_KEY,
        },

    });

    const mailOptions = {
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html,
        headers: {
            'X-Forwarded': 'true'
        }
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email forwarded:', info.response);
        }
    });

    transporter.on('error', (error) => {
        console.error('Nodemailer error:', error);
    });


}

const sslCert = fs.readFileSync(process.env.SSL_CERT)
const sslKey = fs.readFileSync(process.env.SSL_KEY)

// console.log('sslCert=> ',sslCert)
// console.log('sslKey=> ',sslKey)
const createSMTPServer = (port) => {
    const server = new SMTPServer({
        maxClients: 50,
        secure: false,
        requireTLS: true,
        tls: {
            key: sslKey,
            cert: sslCert ,
        },
        allowInsecureAuth:true,
        authOptional: true,
        onAuth: async (auth, session, callback) => {
            try {
                console.log('Auth Object:', auth);
                console.log('session Object:', session);
                const systemEmails = ['no-reply', 'verification', 'reset-password', 'welcome']
                if (systemEmails.includes(auth?.username) && auth?.password === process.env.JWT_KEY) {
                    callback(null, {user: 'system'});
                } else if (auth?.username && !systemEmails.includes(auth?.username)) { // change here from auth?._id to auth?.user
                    const userData = await userSchema.findById(auth?.username).exec(); // change here from auth?._id to auth?.user
                    const isPasswordCorrect: boolean = await bcrypt.compare(auth?.password, userData.password);
                    if (!isPasswordCorrect) {
                        return callback(new Error("Invalid username or password"));
                    } else {
                        callback(null, {user: userData.username});
                    }

                } else {
                    return callback(null, {
                        data: {
                            status: "401",
                            schemes: "bearer mac",
                            scope: "Invalid username or password"
                        }
                    })
                }
            } catch (error) {
                console.error("SMTP Server Error: ", error);
                callback(new Error("Server Error"));
            }
        },
        onData(stream, session, callback) {
            console.log('Received an Email on port: ', port)
            simpleParser(stream, async (err, parsed) => {
                console.log('Parsing the Email')
                if (err) {
                    console.error('Failed to parse email:', err);
                    callback();
                    return;
                }
                const parsedData = {
                    from: parsed.from.text,
                    to: parsed.to.text,
                    subject: parsed.subject,
                    text: parsed.text,
                    html: parsed.html,
                    date: parsed.date,
                    status: 'received'
                }
                console.log('Parsed the Email', parsedData)

                const emailActionType = emailActionTypeDetector(parsedData.from, parsedData.to)

                console.log('emailActionType=> ', emailActionType)

                if (emailActionType === 'received') {
                    console.log('Received Email')
                    // Handle incoming email logic here
                } else if (emailActionType === 'toSend') {
                    console.log('Email To Send')
                    if (parsed.headers.get('x-forwarded')) {
                        console.log('Email already forwarded. Ignoring to prevent loop.')
                        callback();
                        return;
                    }

                    await externalMailSender({email: parsedData, user: 'welcome', port})

                }

                callback();
            });
        },

    });

    server.on("error", err => {
        console.log("Error %s", err.message);
    });
//&& process.env.SSL_CERT && process.env.SSL_KEY
    if (process.env.MAIL_SERVER === 'true') {
        server.listen(port);
        console.log(`Mail server started on port ${port}`);
    } else {
        console.log('Mail Server Is Disabled')
    }
}

const ports = [25, 587];

ports.forEach(port => createSMTPServer(port));


// const email = new emailSchema(receivedEmailParsedData);
//
// await email.save();


// onData(stream, session, callback) {
//     console.log('Received an Email')
//     simpleParser(stream, async (err, parsed) => {
//         console.log('Parsing the Email')
//         if (err) {
//             console.error('Failed to parse email:', err);
//             callback();
//             return;
//         }
//         const parsedData = {
//             from: parsed.from.text,
//             to: parsed.to.text,
//             subject: parsed.subject,
//             text: parsed.text,
//             html: parsed.html,
//             date: parsed.date,
//             status: 'received'
//         }
//         console.log('Parsed the Email', parsedData)
//
//         const emailActionType = emailActionTypeDetector(parsedData.from,parsedData.to)
//
//         console.log('emailActionType=> ',emailActionType)
//
//         if (emailActionType==='received'){
//
//         }else if (emailActionType==='toSend'){
//
//         }else if (emailActionType==='internal'){
//
//         }
//
//         callback();
//     });
//
// },



