require('dotenv').config({path: '../../../../.env'})

const nodemailer = require('nodemailer');

console.log('console=> ',process.env.JWT_KEY)

const transporter = nodemailer.createTransport({
    host: 'mail.trdland.de',
    port: 465,
    secure: true, // for port 465
    auth: {
        user: 'welcome',
        pass: process.env.JWT_KEY,
    },
});

const mailOptions = {
    from: 'welcome@trdland.de',
    to: 'mmlnima@gmail.com',
    subject: 'Welcome to MyApp!',
    text: 'Thank you for registering on MyApp.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});












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