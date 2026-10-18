import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Testimonial, TestimonialAvatar } from '@/payload-types' // Avatar type import kiya
import { cacheLife, cacheTag } from 'next/cache'

import TestimonialSection from './testimonial.section'

async function getCachedTestimonials() {
  'use cache'
  cacheLife('hours')
  cacheTag('testimonials-data')

  const payload = await getPayload({ config: configPromise })

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

  return docs as unknown as Testimonial[]
}

export default async function Testimonial() {
  const rawTestimonials = await getCachedTestimonials()

  if (!rawTestimonials || rawTestimonials.length === 0) return null

  // 🔥 DATA SANITIZATION: Client ko object ki jagah sirf strings pass karein
  const cleanTestimonials = rawTestimonials.map((item) => {
    const avatarObj =
      typeof item.avatar === 'object' && item.avatar !== null
        ? (item.avatar as TestimonialAvatar)
        : null

    const avatarUrl = avatarObj?.thumbnailURL || avatarObj?.url || ''

    return {
      id: item.id,
      clientName: item.clientName,
      review: item.review,
      avatarUrl: avatarUrl, // Ab ye direct string hai!
    }
  })

  return <TestimonialSection data={cleanTestimonials} />
}
