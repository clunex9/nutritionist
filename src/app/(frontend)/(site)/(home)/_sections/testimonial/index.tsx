import { getPayload } from 'payload'
import configPromise from '@payload-config'
import TestimonialSection from './testimonial.section'

export default async function Testimonial() {
  const payload = await getPayload({ config: configPromise })

  const { docs: testimonialsData } = await payload.find({
    collection: 'testimonials',
    limit: 10,
  })

  return <TestimonialSection data={testimonialsData} />
}
