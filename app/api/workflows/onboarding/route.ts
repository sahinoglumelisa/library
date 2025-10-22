import { serve } from "@upstash/workflow/nextjs"
import emailjs from "@emailjs/nodejs"
import config from "@/lib/config"

type InitialData = {
  email: string
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email } = context.requestPayload

  // Send welcome email immediately when user registers
  await context.run("send-welcome-email", async () => {
    await sendWelcomeEmail(email)
  })
})

async function sendWelcomeEmail(email: string) {
  try {
    const templateParams = {
      to_email: email,
      message: "Welcome to our Library! We're excited to have you join our community. Start browsing and borrowing books today!",
      type: "welcome",
    }

    const response = await emailjs.send(
      config.env.emailjs.serviceId!,
      config.env.emailjs.templateId!,
      templateParams,
      {
        publicKey: config.env.emailjs.publicKey!,
        privateKey: config.env.emailjs.privateKey!,
      }
    )

    console.log(`Welcome email sent successfully to ${email}:`, response)
    return response
  } catch (error) {
    console.error(`Failed to send welcome email to ${email}:`, error)
    throw error
  }
}