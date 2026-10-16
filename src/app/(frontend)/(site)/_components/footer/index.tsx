// import Link from 'next/link'
// import ScrollToTop from './scroll-to-top'
// import NavLinks from './nav-links'
// import { buttonVariants } from '@/components/ui/button' // ✅ Button ki jagah buttonVariants import kiya
// import FooterLogo from './footer-logo'

// export default function Footer() {
//   return (
//     <footer className="bg-dark-green-15 py-10">
//       <div className="container">
//         <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
//           <FooterLogo />
//           <NavLinks />
//           <ScrollToTop className="absolute top-0 right-0 lg:static" />
//         </div>

//         <div className="bg-dark-green-20 border-dark-green-25 mt-10 flex w-full flex-col items-center justify-between rounded-md border p-4 xl:flex-row">
//           <div className="flex w-full flex-col gap-4 lg:w-fit lg:flex-row">
//             {/* Button 1 - Email */}
//             <Link
//               href="mailto:deepak7890bind@gmail.com"
//               className={buttonVariants({
//                 variant: 'ghost',
//                 className:
//                   'border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! justify-center gap-2 rounded-lg border p-3 font-medium',
//               })}
//             >
//               <svg
//                 width="24"
//                 height="25"
//                 viewBox="0 0 24 25"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="size-6 shrink-0"
//               >
//                 <path
//                   d="M1.5 9.1691V17.75C1.5 19.4069 2.84315 20.75 4.5 20.75H19.5C21.1569 20.75 22.5 19.4069 22.5 17.75V9.1691L13.5723 14.6631C12.6081 15.2564 11.3919 15.2564 10.4277 14.6631L1.5 9.1691Z"
//                   fill="#CBEA7B"
//                 />
//                 <path
//                   d="M22.5 7.40783V7.25C22.5 5.59315 21.1569 4.25 19.5 4.25H4.5C2.84315 4.25 1.5 5.59315 1.5 7.25V7.40783L11.2139 13.3856C11.696 13.6823 12.304 13.6823 12.7861 13.3856L22.5 7.40783Z"
//                   fill="#CBEA7B"
//                 />
//               </svg>
//               <span className="text-base">hello@squareup.com</span>
//             </Link>

//             {/* Button 2 - Phone */}
//             <Link
//               href="tel:+917722072980"
//               className={buttonVariants({
//                 variant: 'ghost',
//                 className:
//                   'border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! justify-center gap-2 rounded-lg border p-3 font-medium',
//               })}
//             >
//               <svg
//                 width="24"
//                 height="25"
//                 viewBox="0 0 24 25"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="size-6 shrink-0"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M1.5 5C1.5 3.34315 2.84315 2 4.5 2H5.87163C6.732 2 7.48197 2.58556 7.69064 3.42025L8.79644 7.84343C8.97941 8.5753 8.70594 9.34555 8.10242 9.79818L6.8088 10.7684C6.67447 10.8691 6.64527 11.0167 6.683 11.1197C7.81851 14.2195 10.2805 16.6815 13.3803 17.817C13.4833 17.8547 13.6309 17.8255 13.7316 17.6912L14.7018 16.3976C15.1545 15.7941 15.9247 15.5206 16.6566 15.7036L21.0798 16.8094C21.9144 17.018 22.5 17.768 22.5 18.6284V20C22.5 21.6569 21.1569 23 19.5 23H17.25C8.55151 23 1.5 15.9485 1.5 7.25V5Z"
//                   fill="#CBEA7B"
//                 />
//               </svg>
//               <span className="text-[16px]">+91 91813 23 2309</span>
//             </Link>

//             {/* Button 3 - Location */}
//             <Link
//               href="https://www.google.com/maps"
//               target="_blank"
//               className={buttonVariants({
//                 variant: 'ghost',
//                 className:
//                   'border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! justify-center gap-2 rounded-lg border p-3 font-medium',
//               })}
//             >
//               <svg
//                 width="24"
//                 height="25"
//                 viewBox="0 0 24 25"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="size-6 shrink-0"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M11.5397 22.851C11.57 22.8685 11.5937 22.8821 11.6105 22.8915L11.6384 22.9071C11.8613 23.0294 12.1378 23.0285 12.3608 22.9075L12.3895 22.8915C12.4063 22.8821 12.43 22.8685 12.4603 22.851C12.5207 22.816 12.607 22.765 12.7155 22.6982C12.9325 22.5646 13.2388 22.3676 13.6046 22.1091C14.3351 21.5931 15.3097 20.8274 16.2865 19.8273C18.2307 17.8368 20.25 14.8462 20.25 11C20.25 6.44365 16.5563 2.75 12 2.75C7.44365 2.75 3.75 6.44365 3.75 11C3.75 14.8462 5.76932 17.8368 7.71346 19.8273C8.69025 20.8274 9.66491 21.5931 10.3954 22.1091C10.7612 22.3676 11.0675 22.5646 11.2845 22.6982C11.393 22.765 11.4793 22.816 11.5397 22.851ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
//                   fill="#CBEA7B"
//                 />
//               </svg>
//               <span className="text-[16px]">Somewhere in the World</span>
//             </Link>
//           </div>

//           <div className="text-background mt-4 text-sm xl:mt-0">
//             © {new Date().getFullYear()} Nutritionist. All rights reserved.
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ScrollToTop from './scroll-to-top'
import NavLinks from './nav-links'
import { buttonVariants } from '@/components/ui/button'
import FooterLogo from './footer-logo'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer ke liye ek smooth unified timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%', // Jab footer screen mein thoda andar aaye
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      })

      // 1. Top Row (Logo, Navigation, Go to top button)
      tl.to('.footer-top-item', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
      })
        // 2. Bottom Card Container (Dark green box)
        .to(
          '.footer-bottom-card',
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '-=0.3',
        )
        // 3. Bottom Card ke andar ke items (Buttons aur Copyright)
        .to(
          '.footer-bottom-item',
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.4', // Card aane se thoda pehle hi andar ka text aana shuru ho jayega
        )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-dark-green-15 overflow-hidden py-10">
      <div className="container">
        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          {/* Logo - Animation Target */}
          <div className="footer-top-item translate-y-10 opacity-0">
            <FooterLogo />
          </div>

          {/* NavLinks - Animation Target */}
          <div className="footer-top-item translate-y-10 opacity-0">
            <NavLinks />
          </div>

          {/* Scroll To Top - Animation Target (className merge kar di gayi hai) */}
          <ScrollToTop className="footer-top-item absolute top-0 right-0 translate-y-10 opacity-0 lg:static" />
        </div>

        {/* Bottom Card - Animation Target */}
        <div className="footer-bottom-card bg-dark-green-20 border-dark-green-25 mt-10 flex w-full translate-y-10 flex-col items-center justify-between rounded-md border p-4 opacity-0 xl:flex-row">
          <div className="flex w-full flex-col gap-4 lg:w-fit lg:flex-row">
            {/* Button 1 - Email (Animation class inside buttonVariants) */}
            <Link
              href="mailto:deepak7890bind@gmail.com"
              className={buttonVariants({
                variant: 'ghost',
                className:
                  'footer-bottom-item border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! translate-y-6 justify-center gap-2 rounded-lg border p-3 font-medium opacity-0',
              })}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 shrink-0"
              >
                <path
                  d="M1.5 9.1691V17.75C1.5 19.4069 2.84315 20.75 4.5 20.75H19.5C21.1569 20.75 22.5 19.4069 22.5 17.75V9.1691L13.5723 14.6631C12.6081 15.2564 11.3919 15.2564 10.4277 14.6631L1.5 9.1691Z"
                  fill="#CBEA7B"
                />
                <path
                  d="M22.5 7.40783V7.25C22.5 5.59315 21.1569 4.25 19.5 4.25H4.5C2.84315 4.25 1.5 5.59315 1.5 7.25V7.40783L11.2139 13.3856C11.696 13.6823 12.304 13.6823 12.7861 13.3856L22.5 7.40783Z"
                  fill="#CBEA7B"
                />
              </svg>
              <span className="text-base">hello@squareup.com</span>
            </Link>

            {/* Button 2 - Phone (Animation class inside buttonVariants) */}
            <Link
              href="tel:+917722072980"
              className={buttonVariants({
                variant: 'ghost',
                className:
                  'footer-bottom-item border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! translate-y-6 justify-center gap-2 rounded-lg border p-3 font-medium opacity-0',
              })}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5 5C1.5 3.34315 2.84315 2 4.5 2H5.87163C6.732 2 7.48197 2.58556 7.69064 3.42025L8.79644 7.84343C8.97941 8.5753 8.70594 9.34555 8.10242 9.79818L6.8088 10.7684C6.67447 10.8691 6.64527 11.0167 6.683 11.1197C7.81851 14.2195 10.2805 16.6815 13.3803 17.817C13.4833 17.8547 13.6309 17.8255 13.7316 17.6912L14.7018 16.3976C15.1545 15.7941 15.9247 15.5206 16.6566 15.7036L21.0798 16.8094C21.9144 17.018 22.5 17.768 22.5 18.6284V20C22.5 21.6569 21.1569 23 19.5 23H17.25C8.55151 23 1.5 15.9485 1.5 7.25V5Z"
                  fill="#CBEA7B"
                />
              </svg>
              <span className="text-[16px]">+91 91813 23 2309</span>
            </Link>

            {/* Button 3 - Location (Animation class inside buttonVariants) */}
            <Link
              href="https://www.google.com/maps"
              target="_blank"
              className={buttonVariants({
                variant: 'ghost',
                className:
                  'footer-bottom-item border-dark-green-25! hover:bg-dark-green-25! text-background! flex h-auto! translate-y-6 justify-center gap-2 rounded-lg border p-3 font-medium opacity-0',
              })}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5397 22.851C11.57 22.8685 11.5937 22.8821 11.6105 22.8915L11.6384 22.9071C11.8613 23.0294 12.1378 23.0285 12.3608 22.9075L12.3895 22.8915C12.4063 22.8821 12.43 22.8685 12.4603 22.851C12.5207 22.816 12.607 22.765 12.7155 22.6982C12.9325 22.5646 13.2388 22.3676 13.6046 22.1091C14.3351 21.5931 15.3097 20.8274 16.2865 19.8273C18.2307 17.8368 20.25 14.8462 20.25 11C20.25 6.44365 16.5563 2.75 12 2.75C7.44365 2.75 3.75 6.44365 3.75 11C3.75 14.8462 5.76932 17.8368 7.71346 19.8273C8.69025 20.8274 9.66491 21.5931 10.3954 22.1091C10.7612 22.3676 11.0675 22.5646 11.2845 22.6982C11.393 22.765 11.4793 22.816 11.5397 22.851ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
                  fill="#CBEA7B"
                />
              </svg>
              <span className="text-[16px]">Somewhere in the World</span>
            </Link>
          </div>

          <div className="footer-bottom-item text-background mt-4 translate-y-6 text-sm opacity-0 xl:mt-0">
            © {new Date().getFullYear()} Nutritionist. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
