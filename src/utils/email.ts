import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com' as string,
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false
  }

});

export { transporter }

// export const sendEmail = async (
//   to: string,
//   subject: string,
//   html: string
// ) => {
//   await transporter.sendMail({
//     from: `"Eventful" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html
//   })
// }
