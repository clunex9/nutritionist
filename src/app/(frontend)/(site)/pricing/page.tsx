import React from 'react'
import HeaderInformation from './_sections/header-information'
import FAQ from './_sections/FAQ'
import PricingPlans from './_sections/pricing-plans'
import ComparisonTable from './_sections/comparison-table'

export default function Pricing() {
  return (
    <React.Fragment>
      <HeaderInformation />
      <PricingPlans />
      <ComparisonTable />
      <FAQ />
    </React.Fragment>
  )
}
