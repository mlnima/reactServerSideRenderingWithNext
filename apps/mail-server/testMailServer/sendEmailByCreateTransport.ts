import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import nodemailer from 'nodemailer';

console.log('process.env.MAIL_SERVER_HOST=> ',process.env.MAIL_SERVER_HOST)
console.log('JWT_KEY=> ',process.env.JWT_KEY)

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER_HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'welcome',
        pass: process.env.JWT_KEY,
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});

const mailOptions = {
    from: 'welcome@trdland.de',
    to: 'mmlnima@gmail.com',
    subject: 'Welcome to MyApp!',
    text: 'Thank you for registering on MyApp.',
    html: '<p>Thank you for registering on MyApp.</p>',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});


// const transporter = nodemailer.createTransport(smtpTransport({
//     host: 'mail.trdland.de',
//     port: 587,
//     secure: false,
//     secureConnection: false,
//     // secure: true, // for port 465
//     auth: {
//         user: 'welcome',
//         pass:'trdland$%',
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// }));




// const smtpTransport = require('nodemailer-smtp-transport');
//
// console.log('console=> xxx',process.env.JWT_KEY)





// const nodemailer = require('nodemailer');
//
// const transporter = nodemailer.createTransport({
//     host: 'mail.trdland.de',
//     port: 465,
//     secure: false,
//     // requireTLS: true,
//     auth: {
//         user: 'welcome',
//         pass: 'trdland$%',
//     },
//     // tls: {
//     //     rejectUnauthorized: false
//     // }
// });
//
// const mailOptions = {
//     from: 'welcome@trdland.de',
//     to: 'mmlnima@gmail.com',
//     subject: 'Welcome to MyApp!',
//     text: 'Thank you for registering on MyApp.',
// };
//
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.error('Error sending email:', error);
//     } else {
//         console.log('Email sent:', info.response);
//     }
// });