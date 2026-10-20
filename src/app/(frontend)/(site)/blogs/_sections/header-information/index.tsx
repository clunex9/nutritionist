import headerBgGrid from '@/assets/svg/header-bg-grid.svg'
import headerDarkLogo from '@/assets/svg/dark-logo.svg'
import Image from 'next/image'

export default function HeaderInformation() {
  return (
    <section id="header-information" className="scroll-mt-10 pt-7.5 lg:pt-10">
      <div className="container">
        <div className="bg-green-95 border-green-85 relative flex flex-col items-center justify-center overflow-hidden rounded-t-lg border p-7.5 lg:p-20">
          <div className="pointer-events-none absolute top-0 left-1/2 z-0 -translate-x-1/2">
            <Image
              src={headerBgGrid}
              alt="header bg grid"
              width={800}
              height={400}
              className="h-auto w-auto max-w-none object-top"
            />
          </div>

          <div className="from-green-70 to-green-90 border-background relative z-10 mb-4 flex size-15.5 shrink-0 items-center justify-center rounded-lg border-4 bg-linear-to-b p-2">
            <Image
              src={headerDarkLogo}
              alt="header-dark-logo"
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>

          <h2 className="text-gray-15 relative z-10 mb-3 text-center text-2xl font-bold lg:mb-5 lg:text-4xl">
            Our Blogs
          </h2>

          <p className="text-gray-20 relative z-10 mx-auto max-w-4xl text-center text-sm lg:text-base">
            Welcome to the Blog section of Nutritionist, your trusted source for insightful
            articles, tips, and expert advice on nutrition and wellness. Here, we strive to provide
            you with engaging and informative content that will inspire and empower you to make
            informed decisions about your health. Explore our blog to discover a wealth of resources
            that cover a wide range of topics related to nutrition, fitness, and overall well-being.
          </p>
        </div>
      </div>
    </section>
  )
}
