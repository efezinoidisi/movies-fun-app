import nodemailer from 'nodemailer';

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;
// console.log(user, pass);
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user,
    pass,
  },
  secure: true,
});

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    return res?.messageId;
  } catch (error) {
    console.log(error);
    return null;
  }
}
