import { fetchTestimonialsAction } from '@/actions/testimonial.action'
import TestimonialSection from './testimonial.section' // Aapka client carousel component

export default async function Testimonial() {
  // 🔥 Server Action call kiya (Jo fully cached hai)
  const cleanTestimonials = await fetchTestimonialsAction()

  if (!cleanTestimonials || cleanTestimonials.length === 0) return null

  return <TestimonialSection data={cleanTestimonials} />
}
