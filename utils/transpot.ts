import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.HOST as string,
  port: parseInt(process.env.SMTP_PORT as string),
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_APIKEY_PUBLIC as string,
    pass: process.env.SMTP_APIKEY_PRIVATE as string,
  },
});
