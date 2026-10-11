import CTASection from './_sections/cta'
import HeaderInformation from './_sections/header-information'
import TeamMembers from './_sections/team-members'
import React from 'react'

export default function TeamPage() {
  return (
    <React.Fragment>
      <HeaderInformation />
      <TeamMembers />
      <CTASection />
    </React.Fragment>
  )
}
