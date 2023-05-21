const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 587,
    secure: false,
    requireTLS: true,
});

const sendTestEmail = async () => {
    const emailData = {
        from: 'sender@example.com',
        to: 'x@x.x',
        subject: 'Test Email',
        text: 'This is a test email. Be Thank Full',
        html: '<p>This is a test email.</p>'
    };

    try {
        console.log('****Sending test mail...');
        let info = await transporter.sendMail(emailData);
        console.log('****Test email sent:', info.messageId);
    } catch (error) {
        console.error('Failed to send test email:', error);
    }
};

sendTestEmail();