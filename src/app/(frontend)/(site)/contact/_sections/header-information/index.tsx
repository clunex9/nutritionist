import SectionHeaderBgGrid from '@/components/shared/section-header-bg-grid'
import SectionHeaderLogo from '@/components/shared/section-header-logo'

export default function HeaderInformation() {
  return (
    <section id="header-information" className="scroll-mt-10 pt-7.5 lg:pt-10">
      <div className="container">
        <div className="bg-green-95 border-green-85 relative flex flex-col items-center justify-center overflow-hidden rounded-t-lg border p-7.5 lg:p-20">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2">
            <SectionHeaderBgGrid />
          </div>

          <div className="bg-green-70 border-background relative z-10 mb-4 flex size-15.5 shrink-0 items-center justify-center rounded-lg border-4">
            <SectionHeaderLogo />
          </div>

          <h2 className="text-gray-15 relative z-10 mb-3 text-center text-2xl font-bold lg:mb-5 lg:text-4xl">
            Contact Us
          </h2>

          <p className="text-gray-20 relative z-10 text-center text-sm lg:text-base">
            We value your feedback, questions, and concerns at Nutritionist. Our dedicated team is
            here to assist you and provide the support you need on your nutritional journey. Please
            don't hesitate to reach out to us using any of the following contact methods
          </p>
        </div>
      </div>
    </section>
  )
}
