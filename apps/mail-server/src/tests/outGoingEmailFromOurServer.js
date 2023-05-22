require('dotenv').config({path: '../../../../.env'})
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    name: 'mail.trdland.de',
    host: 'mail.trdland.de',
    port: 587,
    secure: false,
    auth: {
        user: 'welcome',
        pass: 'trdland$%',
    },
    tls: {
        rejectUnauthorized: false
    }
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