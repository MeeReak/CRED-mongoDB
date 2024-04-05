import { transporter } from "./transpot";

export async function sendVerificationEmail(email: string, token: string) {
  const mailOptions = {
    from: "meereak72@gmail", // Replace with your sender email
    to: email,
    subject: "Verify Your Email Address",
    text: `Click on this link to verify your email: http://localhost:3000/api/user/verify?token=${token} note your token will expired in 1mn` ,
  };

  await transporter.sendMail(mailOptions);
}
