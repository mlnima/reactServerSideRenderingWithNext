import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const mailOptions = {
    from: `verification@${process.env.MAIL_EXTENSION}`,
    to: email,
    subject: 'Account Verification',
    html: `
      <p>Thank you for registering on MyApp.</p>
      <p>
        Please click on the following 
        <a href="${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/v1/users/verification/${verificationToken}">
        link
        </a> 
        to verify your account.
      </p>
    `,
    text: 'Thank you for registering on MyApp.',
  };

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER_HOST,
    port: parseInt(process.env.MAIL_SERVER_PORT || '587', 10),
    secure: process.env.MAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_SERVER_USER, // SMTP username
      pass: process.env.MAIL_SERVER_PASS, // SMTP password
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
};
