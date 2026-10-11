import React from 'react'
import HeaderInformation from './_sections/header-information'
import HowItWorks from './_sections/how-it-works'
import CTA from './_sections/cta'

export default function ProcessPage() {
  return (
    <React.Fragment>
      <HeaderInformation />
      <HowItWorks />
      <CTA />
    </React.Fragment>
  )
}
