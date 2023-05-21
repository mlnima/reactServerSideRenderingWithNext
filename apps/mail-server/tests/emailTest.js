import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'localhost', // SMTP server is on the same machine
    port: 465, // SSL port
    secure: true, // Encryption is enabled
});

export const sendTestEmail = async () => {
    const from = 'sender@example.com'; // replace with your sender email address
    const to = 'receiver@example.com'; // replace with your receiver email address
    const subject = 'Test Email';
    const text = 'This is a test email.';
    const html = '<p>This is a test email.</p>';

    try {
        let info = await transporter.sendMail({ from, to, subject, text, html });
        console.log('Test email sent:', info.messageId);
    } catch (error) {
        console.error('Failed to send test email:', error);
    }
};

// Call the function to send a test email
sendTestEmail();