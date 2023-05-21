const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.trdland.de',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'no-reply',
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