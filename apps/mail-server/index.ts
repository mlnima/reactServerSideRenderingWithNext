import path from 'path';
import SMTPServer from 'smtp-server';
import nodemailer from 'nodemailer';
import { simpleParser } from 'mailparser';
import fs from 'fs';
import {emailSchema} from 'models'

const certificate = path.join(__dirname, '../../../ssl/certificate.cert');
const privateKey = path.join(__dirname, '../../../ssl/private.key');

const transporter = nodemailer.createTransport({
    secure: true,
    key: fs.readFileSync(privateKey),
    cert: fs.readFileSync(certificate),
    host: 'smtp.your-domain.com', // replace with your SMTP server host
    port: 465,
    auth: {
        user: process.env.SMTP_USER, // replace with your SMTP user
        pass: process.env.SMTP_PASSWORD, // replace with your SMTP password
    },
});

export const sendEmail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        let info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
            html,
        });

        console.log('Message sent:', info.messageId);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

const server = new SMTPServer.SMTPServer({
    secure: true,
    key: fs.readFileSync(privateKey),
    cert: fs.readFileSync(certificate),
    onData(stream, session, callback) {
        simpleParser(stream, async (err, parsed) => {
            if (err) {
                console.error('Failed to parse email:', err);
                callback();
                return;
            }

            const email = new emailSchema({
                from: parsed.from.text,
                to: parsed.to.text,
                subject: parsed.subject,
                text: parsed.text,
                html: parsed.html,
                date: parsed.date,
            });

            await email.save();
            callback();
        });
    },
});

server.listen(465); // start the server
