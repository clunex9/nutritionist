import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Testimonial } from '@/payload-types' // 🔥 Type guard ke liye import zaroori hai

import TestimonialSection from './testimonial.section'

// 🔥 1. Data ko Next.js RAM me Forever Cache karein
const getCachedTestimonials = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'testimonials',
      limit: 10,
      depth: 1, // Avatar nikalne ke liye
      pagination: false, // 🚀 Speed boost: Total count query nahi chalegi
      select: {
        clientName: true, // Jo fields UI me chahiye bas wahi select karein
        review: true,
        avatar: true,
      },
    })

    // TypeScript ko strict data bhejne ke liye cast kiya
    return docs as unknown as Testimonial[]
  },
  ['testimonials-cache'], // Unique cache key
  {
    tags: ['testimonials-data'], // 🔥 Tag set kiya (taaki admin update kare toh clear ho)
  },
)

export default async function Testimonial() {
  // 🔥 2. Direct Memory se data fetch hoga (0.01s load time)
  const testimonialsData = await getCachedTestimonials()

  return <TestimonialSection data={testimonialsData} />
}
