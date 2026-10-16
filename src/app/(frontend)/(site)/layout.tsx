import React from 'react'
import Footer from './_components/footer'
import Header from './_components/header'
import SmoothScroll from '@/providers/smooth-scroll.provider'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <SmoothScroll>
        <Header />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </React.Fragment>
  )
}
