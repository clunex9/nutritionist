// import Image from 'next/image'
// import heroImage from './images/hero-image.webp'
// import userOne from './images/user-1.jpg'
// import userTwo from './images/user-2.png'
// import userThree from './images/user-3.png'
// import { AvatarGroup } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'

// export default function Hero() {
//   return (
//     // 1. Parent section ko 'relative' diya taaki absolute background iske hisaab se set ho
//     <section id="hero" className="relative scroll-mt-10 pb-7.5 lg:pb-10">
//       {/* ===== FULL BLEED BACKGROUND (Left Side) ===== */}
//       <div className="bg-hero-pattern absolute top-0 left-0 z-0 h-100 w-full rounded-br-4xl rounded-bl-4xl md:h-125 lg:h-175 lg:w-[calc(50%-20px)] lg:rounded-bl-none" />
//       {/* ===== MAIN CONTENT CONTAINER ===== */}
//       <div className="relative z-10 container w-full px-0 lg:px-4">
//         <div className="flex flex-col items-center gap-0 lg:flex-row lg:gap-10">
//           <div className="relative h-100 w-full overflow-hidden rounded-br-4xl rounded-bl-4xl md:h-125 lg:h-175 lg:w-1/2 lg:rounded-bl-none">
//             <Image
//               src={heroImage}
//               alt="Personalized Nutrition Coaching"
//               fill

//               // 🔥 THE LCP FIX:
//               priority={true}
//               fetchPriority="high" // Lighthouse ki strict demand poori karne ke liye

//               // 👇 Desktop par 50% screen width lega, jisse 25 KiB data waste nahi hoga
//               sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1000px"
//               quality={75}

//               // 👇 Static imported image hai toh blur lagana best practice hai (Zero Blink)
//               // placeholder="blur"
//               decoding="sync"

//               className="absolute inset-0 h-full w-full object-cover"
//             />
//           </div>

//           <div className="relative flex w-full flex-col px-4 pt-22 lg:w-1/2 lg:px-0 lg:pt-0">
//             <span className="decoration-green-70 text-dark-green-15 text-center text-lg font-semibold underline decoration-[4px] underline-offset-8 lg:text-start lg:text-[22px]">
//               Transform Your ❤️ Health with
//             </span>

//             <h1 className="text-dark-green-15 mt-2.5 text-center text-[38px] leading-12 font-bold lg:text-start lg:text-[48px] lg:leading-14">
//               Personalized Nutrition Coaching
//             </h1>

//             <p className="text-gray-20 mt-4 text-center text-sm font-medium lg:text-start lg:text-[16px]">
//               Welcome to Nutritionist, your partner in achieving optimal health through personalized
//               nutrition coaching. Our certified nutritionists are here to guide you on your weight
//               loss journey, providing customized plans and ongoing support. Start your
//               transformation today and experience the power of personalized nutrition coaching.
//             </p>

//             <div className="mt-7.5 flex w-full justify-center gap-4 py-px lg:mt-10 lg:justify-start">
//               <Button className="bg-green-70 hover:bg-green-80 text-gray-15 h-auto! cursor-pointer rounded-sm px-4 py-3 text-sm font-semibold lg:text-[16px]">
//                 Get Starter Today
//               </Button>
//               <Button className="border-green-85 text-gray-15 bg-green-95 hover:bg-green-90 h-auto! cursor-pointer rounded-sm border px-4 py-3 text-sm font-semibold lg:text-[16px]">
//                 Book a Demo
//               </Button>
//             </div>

//             <div className="absolute -top-6.5 left-0 flex w-full flex-col items-center gap-2 lg:static lg:mt-12.5 lg:flex-row">
//               <AvatarGroup className="border-green-70 bg-green-97 flex -space-x-2 rounded-full border p-2">
//                 <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
//                   <Image
//                     src={userOne.src} // Agar userOne imported static image hai, toh sirf 'src={userOne}' bhi likh sakte hain
//                     alt="Happy Customer 1"
//                     width={40} // size-10 ka actual size 40px hota hai
//                     height={40}
//                     // priority={true} // Blink/Flash rokne ke liye
//                     className="h-full w-full object-cover"
//                   />
//                 </div>

//                 <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
//                   <Image
//                     src={userTwo.src}
//                     alt="Happy Customer 2"
//                     width={40}
//                     height={40}
//                     // priority={true}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>

//                 <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
//                   <Image
//                     src={userThree.src}
//                     alt="Happy Customer 3"
//                     width={40}
//                     height={40}
//                     // priority={true}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               </AvatarGroup>
//               <div className="lg:text-lg">
//                 <span className="text-dark-green-30 font-bold">430+</span>{' '}
//                 <span className="text-dark-green-20 font-semibold">Happy Customers</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import heroImage from './images/hero-image.webp'
import userOne from './images/user-1.jpg'
import userTwo from './images/user-2.png'
import userThree from './images/user-3.png'
import { AvatarGroup } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Image animation
      tl.to('.hero-image-wrapper', {
        scale: 1,
        opacity: 1,
        duration: 0.7,
      })
        // 2. Content animation ('<' ka matlab hai ki yeh image ke sath hi shuru ho jayegi)
        .to(
          '.hero-content > *',
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
          },
          '<',
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="hero" className="relative scroll-mt-10 pb-7.5 lg:pb-10">
      {/* ===== FULL BLEED BACKGROUND (Left Side) ===== */}
      <div className="bg-hero-pattern absolute top-0 left-0 z-0 h-100 w-full rounded-br-4xl rounded-bl-4xl md:h-125 lg:h-175 lg:w-[calc(50%-20px)] lg:rounded-bl-none" />

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="relative z-10 container w-full px-0 lg:px-4">
        <div className="flex flex-col items-center gap-0 lg:flex-row lg:gap-10">
          {/* 🔥 LATEST FIX: 'opacity-0 scale-95' class direct CSS se di hai taaki refresh par blink na ho */}
          <div className="hero-image-wrapper relative h-100 w-full scale-95 overflow-hidden rounded-br-4xl rounded-bl-4xl opacity-0 md:h-125 lg:h-175 lg:w-1/2 lg:rounded-bl-none">
            <Image
              src={heroImage}
              alt="Personalized Nutrition Coaching"
              fill
              priority={true}
              fetchPriority="high"
              sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1000px"
              quality={75}
              decoding="sync"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* 🔥 LATEST FIX: Content children par bhi CSS se initial hidden state di hai */}
          <div className="hero-content relative flex w-full flex-col px-4 pt-22 lg:w-1/2 lg:px-0 lg:pt-0">
            <span className="decoration-green-70 text-dark-green-15 translate-y-10 text-center text-lg font-semibold underline decoration-[4px] underline-offset-8 opacity-0 lg:text-start lg:text-[22px]">
              Transform Your ❤️ Health with
            </span>

            <h1 className="text-dark-green-15 mt-2.5 translate-y-10 text-center text-[38px] leading-12 font-bold opacity-0 lg:text-start lg:text-[48px] lg:leading-14">
              Personalized Nutrition Coaching
            </h1>

            <p className="text-gray-20 mt-4 translate-y-10 text-center text-sm font-medium opacity-0 lg:text-start lg:text-[16px]">
              Welcome to Nutritionist, your partner in achieving optimal health through personalized
              nutrition coaching. Our certified nutritionists are here to guide you on your weight
              loss journey, providing customized plans and ongoing support. Start your
              transformation today and experience the power of personalized nutrition coaching.
            </p>

            <div className="mt-7.5 flex w-full translate-y-10 justify-center gap-4 py-px opacity-0 lg:mt-10 lg:justify-start">
              <Button className="bg-green-70 hover:bg-green-80 text-gray-15 h-auto! cursor-pointer rounded-sm px-4 py-3 text-sm font-semibold lg:text-[16px]">
                Get Starter Today
              </Button>
              <Button className="border-green-85 text-gray-15 bg-green-95 hover:bg-green-90 h-auto! cursor-pointer rounded-sm border px-4 py-3 text-sm font-semibold lg:text-[16px]">
                Book a Demo
              </Button>
            </div>

            <div className="absolute -top-6.5 left-0 flex w-full translate-y-10 flex-col items-center gap-2 opacity-0 lg:static lg:mt-12.5 lg:flex-row">
              <AvatarGroup className="border-green-70 bg-green-97 flex -space-x-2 rounded-full border p-2">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={userOne}
                    alt="Happy Customer 1"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={userTwo}
                    alt="Happy Customer 2"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={userThree}
                    alt="Happy Customer 3"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              </AvatarGroup>
              <div className="lg:text-lg">
                <span className="text-dark-green-30 font-bold">430+</span>{' '}
                <span className="text-dark-green-20 font-semibold">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
