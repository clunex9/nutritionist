import Link from 'next/link'
import ScrollToTop from './scroll-to-top'
import NavLinks from './nav-links'
import { buttonVariants } from '@/components/ui/button'
import FooterLogo from './footer-logo'
import CopyrightYear from './copyright-year' // ✅ Naya component import kiya
import mail from '@/assets/svg/mail.svg'
import call from '@/assets/svg/call.svg'
import pin from '@/assets/svg/pin.svg'
import Image from 'next/image'
import { Suspense } from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark-green-15 py-10">
      <div className="container">
        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <FooterLogo />
          <NavLinks />
          <ScrollToTop className="absolute top-0 right-0 lg:static" />
        </div>

        <div className="bg-dark-green-20 border-dark-green-25 mt-10 flex w-full flex-col items-center justify-between rounded-md border p-4 xl:flex-row">
          <div className="flex w-full flex-col gap-4 lg:w-fit lg:flex-row">
            {/* Button 1 - Email */}
            <Link
              href="mailto:support@nutritionist.com"
              className={buttonVariants({
                variant: 'ghost',
                className:
                  'border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! justify-center gap-2 rounded-lg border p-4! font-medium',
              })}
            >
              <Image src={mail} alt="mail" width={26} height={26} />
              <span className="text-base">support@nutritionist.com</span>
            </Link>

            {/* Button 2 - Phone */}
            <Link
              href="tel:+917722072980"
              className={buttonVariants({
                variant: 'ghost',
                className:
                  'border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! justify-center gap-2 rounded-lg border p-4! font-medium',
              })}
            >
              <Image src={call} alt="call" width={26} height={26} />
              <span className="text-[16px]">+91 91813 23 2309</span>
            </Link>

            {/* Button 3 - Location */}
            <Link
              href="https://www.google.com/maps"
              target="_blank"
              className={buttonVariants({
                variant: 'ghost',
                className:
                  'border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! justify-center gap-2 rounded-lg border p-4! font-medium',
              })}
            >
              <Image src={pin} alt="pin" width={26} height={26} />
              <span className="text-[16px]">Somewhere in the World</span>
            </Link>
          </div>

          <div className="text-background mt-4 text-sm xl:mt-0">
            ©{' '}
            <Suspense
              fallback={
                <span className="inline-block h-4 w-10 animate-pulse rounded bg-white/20 align-middle"></span>
              }
            >
              <CopyrightYear />
            </Suspense>{' '}
            Nutritionist. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
