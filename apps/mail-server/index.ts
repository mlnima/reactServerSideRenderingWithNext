import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';

connectToDatabase('Mail Server')
import {SMTPServer} from 'smtp-server';
import {simpleParser} from 'mailparser';
import fs from 'fs';
import {emailSchema, settingSchema, userSchema} from 'models';
import bcrypt from 'bcryptjs';

const createSMTPServer = (port) => {
    const server = new SMTPServer({
        secure: port === 465,
        requireTLS: port !== 465,
        authOptional: true,
        tls: {
            key: fs.readFileSync(process.env.SSL_KEY),
            cert: fs.readFileSync(process.env.SSL_CERT),
        },
        onAuth: async (auth, session, callback) => {
            try {
                console.log('Auth Object:', auth);
                const systemEmails = ['no-reply', 'verification', 'reset-password', 'welcome']
                if (systemEmails.includes(auth?.username) && auth?.password === process.env.JWT_KEY) {
                    callback(null, {user: 'system'});
                } else if (auth?.username) { // change here from auth?._id to auth?.user
                    const userData = await userSchema.findById(auth?.username).exec(); // change here from auth?._id to auth?.user
                    const isPasswordCorrect: boolean = await bcrypt.compare(auth?.password, userData.password);
                    if (!isPasswordCorrect) {
                        return callback(null, {
                            data: {
                                status: "401",
                                schemes: "bearer mac",
                                scope: "Invalid username or password"
                            }
                        })
                    } else {
                        callback(null, {user: userData.username});
                    }

                }
            } catch (error) {
                console.error("SMTP Server Error: ", error);
                callback(new Error("Server Error"));
            }
        },
        onData(stream, session, callback) {
            console.log('email=> got email',)
            simpleParser(stream, async (err, parsed) => {
                if (err) {
                    console.error('Failed to parse email:', err);
                    callback();
                    return;
                }

                const receivedEmailParsedData = {
                    from: parsed.from.text,
                    to: parsed.to.text,
                    subject: parsed.subject,
                    text: parsed.text,
                    html: parsed.html,
                    date: parsed.date,
                    status: 'received'
                }

                console.log('port=> ', port)
                console.log('received email=> ', receivedEmailParsedData)

                callback();
            });

        },
    });

    server.on("error", err => {
        console.log("Error %s", err.message);
    });

    if (process.env.MAIL_SERVER === 'true' && process.env.SSL_CERT && process.env.SSL_KEY) {
        server.listen(port);
        console.log(`Mail server started on port ${port}`);
    } else {
        console.log('Mail Server Is Disabled')
    }
}

const ports = [25, 465, 587, 2525];

ports.forEach(port => createSMTPServer(port));


// onAuth: async (auth, session, callback) => {
//     try {
//         console.log('onAuth=> ', auth?.user, auth?._id, auth?.pass)
//         const systemEmails = ['no-reply', 'verification', 'reset-password', 'welcome']
//         if (systemEmails.includes(auth?.user) && auth?.pass=== process.env.JWT_KEY) {
//             callback(null, {user: 'system'});
//         } else if(auth?._id) {
//             const userData = await userSchema.findById(auth?._id).exec();
//             const isPasswordCorrect: boolean = await bcrypt.compare(auth?.pass, userData.password);
//             if (!isPasswordCorrect) {
//                 //   return callback(new Error("Invalid username or password"));
//                 return callback(null, {
//                     data: {
//                         status: "401",
//                         schemes: "bearer mac",
//                         scope: "Invalid username or password"
//                     }
//                 })
//             } else {
//                 callback(null, {user: userData.username});
//             }
//
//         }
//     }catch (error){
//
//     }
//
// },


// import dotenv from 'dotenv';
// dotenv.config({path: '../../.env'});
// import {connectToDatabase} from 'custom-server-util';
// connectToDatabase('Mail Server')
// import {SMTPServer} from 'smtp-server';
// import {simpleParser} from 'mailparser';
// import fs from 'fs';
// import {emailSchema, settingSchema, userSchema} from 'models';
// import bcrypt from 'bcryptjs';
// import * as process from "process";
//
// const server = new SMTPServer({
//     secure: false,
//     requireTLS: true,
//     authOptional: true,
//     tls: {
//         key: fs.readFileSync(process.env.SSL_KEY),
//         cert: fs.readFileSync(process.env.SSL_CERT),
//     },
//     onAuth: async (auth, session, callback) => {
//
//         console.log('onAuth=> ',auth?.username,auth?._id,auth?.password)
//         const systemEmails = ['no-reply','verification','reset-password','welcome']
//         if (   systemEmails.includes(auth?.username) && auth?.password ===  process.env.JWT_KEY ){
//             callback(null, { user: 'system' });
//         }else {
//             const userData = await userSchema.findById(auth?._id).exec();
//             const isPasswordCorrect: boolean = await bcrypt.compare(auth?.password, userData.password);
//             if (!isPasswordCorrect) {
//              //   return callback(new Error("Invalid username or password"));
//                 return callback(null, {
//                     data: {
//                         status: "401",
//                         schemes: "bearer mac",
//                         scope: "Invalid username or password"
//                     }
//                 })
//             }else {
//                 callback(null, { user: userData.username });
//             }
//
//         }
//     },
//     onData(stream, session, callback) {
//         console.log('email=> got email',)
//         simpleParser(stream, async (err, parsed) => {
//             if (err) {
//                 console.error('Failed to parse email:', err);
//                 callback();
//                 return;
//             }
//
//             const receivedEmailParsedData = {
//                 from: parsed.from.text,
//                 to: parsed.to.text,
//                 subject: parsed.subject,
//                 text: parsed.text,
//                 html: parsed.html,
//                 date: parsed.date,
//                 status:'received'
//             }
//
//             console.log(parsed)
//             console.log('received email=> ',receivedEmailParsedData)
//
//             callback();
//         });
//     },
// });
//
//
// server.on("error", err => {
//     console.log("Error %s", err.message);
// });
//
// console.log('MailServer Report => ', process.env.MAIL_SERVER,process.env.SSL_CERT,process.env.SSL_KEY)
//
// if (process.env.MAIL_SERVER === 'true' && process.env.SSL_CERT && process.env.SSL_KEY) {
//     server.listen(587);
//     console.log('Mail server started on port 587');
//
// } else {
//     console.log('Mail Server Is Disabled')
// }

// const email = new emailSchema(receivedEmailParsedData);
//
// await email.save();


// onAuth(auth, session, callback) {
//     if (auth.username !== 'x@x.x' || auth.password !== 'xxxxxx') {
//         return callback(new Error('Invalid username or password'));
//     }
//     callback(null, { user: 'User' }); // where user is the authenticated user
// },
// const email = new emailSchema({
//     from: parsed.from.text,
//     to: parsed.to.text,
//     subject: parsed.subject,
//     text: parsed.text,
//     html: parsed.html,
//     date: parsed.date,
// });
//
// await email.save();


// const transporter = nodemailer.createTransport({
//     secure: true,
//     key: fs.readFileSync(privateKey),
//     cert: fs.readFileSync(certificate),
//     host: 'smtp.your-domain.com', // replace with your SMTP server host
//     port: 465,
//     auth: {
//         user: process.env.SMTP_USER, // replace with your SMTP user
//         pass: process.env.SMTP_PASSWORD, // replace with your SMTP password
//     },
// });


// export const sendEmail = async (req, res) => {
//     const { to, subject, text, html } = req.body;
//
//     try {
//         let info = await transporter.sendMail({
//             from: process.env.SMTP_USER,
//             to,
//             subject,
//             text,
//             html,
//         });
//
//         console.log('Message sent:', info.messageId);
//
//         res.status(200).json({ message: 'Email sent successfully' });
//     } catch (error) {
//         console.error('Failed to send email:', error);
//         res.status(500).json({ error: 'Failed to send email' });
//     }
// };