// EmailJS integration utility
import emailjs from "@emailjs/browser"

const SERVICE_ID = "service_o7gkvbu"
const TEMPLATE_ID = "Resume_Template_Final"
const PUBLIC_KEY = "IriL9iG7M4NdMiljz"

export const sendEmail = async (templateParams: any) => {
  try {
    console.log("Sending email with params:", templateParams)
    
    const response = await emailjs.send(
      SERVICE_ID, 
      TEMPLATE_ID, 
      {
        ...templateParams,
        to_email: "Official.nikhilgarg@gmail.com" // Ensure recipient email is set
      }, 
      PUBLIC_KEY
    )
    
    console.log("EmailJS Response:", response)
    return { success: true, response }
  } catch (error) {
    console.error("EmailJS Error:", error)
    return { success: false, error }
  }
}
