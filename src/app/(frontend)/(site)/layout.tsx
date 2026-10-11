import React from 'react'
import Footer from './_components/footer'
import Header from './_components/header'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  )
}
