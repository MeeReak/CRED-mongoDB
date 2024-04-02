import { transporter } from "./transpot";

export async function sendVerificationEmail(email: string, token: string) {
  const mailOptions = {
    from: "meereak72@gmail", // Replace with your sender email
    to: email,
    subject: "Verify Your Email Address",
    text: `Click on this link to verify your email: https://www.youtube.com/watch?v=m_XUClQCOUc?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
}
