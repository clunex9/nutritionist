import React from 'react'
import Blogs from './_sections/blogs'
import HeaderInformation from './_sections/header-information'
import CTASection from './_sections/cta'

export default function Blog() {
  return (
    <React.Fragment>
      <HeaderInformation />
      <Blogs />
      <CTASection />
    </React.Fragment>
  )
}
