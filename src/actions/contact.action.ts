// src/actions/contactActions.ts
'use server'

// Same Zod schema jo frontend par hai (Security ke liye backend par bhi check karenge)
import * as z from 'zod'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  phone: z.string().min(10).max(10),
  message: z.string().min(10).max(250),
})

export async function submitContactForm(data: z.infer<typeof formSchema>) {
  try {
    // 1. Backend Validation
    const parsedData = formSchema.parse(data)

    // 2. Initialize Payload
    const payload = await getPayload({ config: configPromise })

    // 3. Save to Database
    await payload.create({
      collection: 'contact-submissions',
      data: parsedData,
    })

    // (Optional) Agar success ke baad koi page cache clear karna ho
    // revalidatePath('/contact')

    return { success: true, message: 'Message sent successfully!' }
  } catch (error) {
    console.error('Contact Form Error:', error)
    return { success: false, message: 'Failed to send message. Please try again later.' }
  }
}
