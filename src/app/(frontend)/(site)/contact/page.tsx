import React from 'react'
import ContactForm from './_sections/contact-form'
import CTA from './_sections/cta'
import HeaderInformation from './_sections/header-information'

export default function Contact() {
  return (
    <React.Fragment>
      <HeaderInformation />
      <ContactForm />
      <CTA />
    </React.Fragment>
  )
}
