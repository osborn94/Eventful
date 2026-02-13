import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"Eventful" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  })
}
