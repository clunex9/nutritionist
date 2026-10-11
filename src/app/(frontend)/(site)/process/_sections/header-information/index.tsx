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
            Your Journey to Health and Wellness
          </h2>

          <p className="text-gray-20 relative z-10 text-center text-sm lg:text-base">
            At Nutritionist, we believe in providing a personalized and comprehensive approach to
            help you achieve your health and wellness goals. Our "How it Works" process is designed
            to guide you through each step of your journey, ensuring that you receive the support,
            knowledge, and tools you need to succeed. Here's a detailed breakdown of our process:
          </p>
        </div>
      </div>
    </section>
  )
}
