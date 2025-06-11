// backend/utils/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    // 1. Create a transporter object using the default SMTP transport
    // You would configure this with your actual SMTP server details (e.g., SendGrid, Mailgun, Gmail)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 2. Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM, // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      html: html, // HTML body
      text: text, // Plain text body (optional, but good for fallback)
    };

    // 3. Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview only if sending through an Ethereal account
    if (process.env.NODE_ENV === 'development' && !process.env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email: ' + error.message);
  }
};

export default sendEmail;