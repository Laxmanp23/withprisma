import nodemailer from "nodemailer"

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {

  const emailUser = process.env.EMAIL_USER?.trim()
  const emailPass = process.env.EMAIL_PASS?.trim()

  if (!emailUser || !emailPass) {
    throw new Error("EMAIL_USER or EMAIL_PASS is missing")
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass
    }
  })

  await transporter.sendMail({
    from: emailUser,
    to,
    subject,
    html   // important
  })

}