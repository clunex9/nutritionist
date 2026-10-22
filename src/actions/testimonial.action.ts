'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import type { Testimonial, TestimonialAvatar } from '@/payload-types'

// 🔥 Clean Type for Client Consumption
export type CleanTestimonial = {
  id: string
  clientName: string
  review: string
  avatarUrl: string
}

export async function fetchTestimonialsAction(): Promise<CleanTestimonial[]> {
  // 🔥 NEXT.JS 16 SERVER CACHING
  'use cache'
  cacheLife('hours')
  cacheTag('testimonials-data')

  const payload = await getPayload({ config: configPromise })

  try {
    const { docs } = await payload.find({
      collection: 'testimonials',
      limit: 10,
      depth: 1,
      pagination: false,
      select: {
        clientName: true,
        review: true,
        avatar: true,
      },
    })

    if (!docs || docs.length === 0) return []

    // 🔥 Data Sanitization: Payload objects ko lightweight strings mein convert karna
    const cleanTestimonials: CleanTestimonial[] = docs.map((item) => {
      const testimonialItem = item as unknown as Testimonial

      const avatarObj =
        typeof testimonialItem.avatar === 'object' && testimonialItem.avatar !== null
          ? (testimonialItem.avatar as TestimonialAvatar)
          : null

      const avatarUrl = avatarObj?.thumbnailURL || avatarObj?.url || ''

      return {
        id: testimonialItem.id,
        clientName: testimonialItem.clientName,
        review: testimonialItem.review,
        avatarUrl: avatarUrl,
      }
    })

    return cleanTestimonials
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}
