import React from 'react'
import Hero from './_sections/hero'
import Features from './_sections/features'
import Blogs from './_sections/blogs'
import Testimonial from './_sections/testimonial'
import Pricing from './_sections/pricing'

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Features />
      <Blogs />
      <Testimonial />
      <Pricing />
    </React.Fragment>
  )
}
