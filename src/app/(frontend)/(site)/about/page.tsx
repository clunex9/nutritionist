import Hero from './_sections/hero'
import HeaderInformation from './_sections/header-information'
import OurStory from './_sections/our-story'
import Achievement from './_sections/achievement'
import React from 'react'
import CTASection from './_sections/cta'

export default function About() {
  return (
    <React.Fragment>
      <Hero />
      <HeaderInformation />
      <OurStory />
      <Achievement />
      <CTASection />
    </React.Fragment>
  )
}
