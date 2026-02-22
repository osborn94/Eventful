import { transporter } from "../utils/email.js"

export const sendReminderEmail = async (
  email: string,
  eventTitle: string,
  eventDate: Date
) => {
  try {


    await transporter.sendMail({
      from: `"Eventful" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Reminder: ${eventTitle} is coming up!`,
      html: `
        <h2>Don't forget! 🎉</h2>
        <p>Your event <strong>${eventTitle}</strong> is coming up on 
        <strong>${eventDate.toDateString()}</strong>.</p>
        <p>See you there!</p>
      `,
    })
    console.log(`✅ Reminder sent to ${email}`)
  } catch (error) {
    console.error(`❌ Failed to send reminder to ${email}:`, error)
    throw error
  }
}