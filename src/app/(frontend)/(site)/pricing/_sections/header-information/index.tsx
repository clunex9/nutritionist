import SectionHeaderBgGrid from '@/components/shared/section-header-bg-grid'
import SectionHeaderLogo from '@/components/shared/section-header-logo'

export default function HeaderInformation() {
  return (
    <section id="header-information" className="scroll-mt-10 py-7.5 lg:py-10">
      <div className="container">
        <div className="bg-green-95 border-green-85 relative flex flex-col items-center justify-center overflow-hidden rounded-lg border p-7.5 lg:p-20">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2">
            <SectionHeaderBgGrid />
          </div>

          <div className="bg-green-70 border-background relative z-10 mb-4 flex size-15.5 shrink-0 items-center justify-center rounded-lg border-4">
            <SectionHeaderLogo />
          </div>

          <h2 className="text-gray-15 relative z-10 mb-3 text-center text-2xl font-bold lg:mb-5 lg:text-4xl">
            Our Pricing
          </h2>

          <p className="text-gray-20 relative z-10 text-center text-sm lg:text-base">
            At Nutritionist, we offer flexible pricing options to accommodate your unique
            requirements and budget. Our goal is to provide you with exceptional personalized
            nutrition coaching that is accessible and tailored to your needs. Choose from our three
            plans below and take the first step towards a healthier lifestyle
          </p>
        </div>
      </div>
    </section>
  )
}
