import Image from 'next/image'
import heroImage from './images/hero-image.webp'
import userOne from './images/user-1.jpg'
import userTwo from './images/user-2.png'
import userThree from './images/user-3.png'
import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    // 1. Parent section ko 'relative' diya taaki absolute background iske hisaab se set ho
    <section id="hero" className="relative scroll-mt-10 pb-7.5 lg:pb-10">
      {/* ===== FULL BLEED BACKGROUND (Left Side) ===== */}
      <div
        className="absolute top-0 left-0 z-0 h-100 w-full rounded-br-4xl rounded-bl-4xl md:h-125 lg:h-175 lg:w-[calc(50%-20px)] lg:rounded-bl-none"
        style={{
          backgroundColor: '#dcf1a7',
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M17 20h6M20 17v6' stroke='%23999' stroke-width='1'/%3E%3C/svg%3E"),
            linear-gradient(to right, #D4DEB9 1px, transparent 0),
            linear-gradient(to bottom, #D4DEB9 1px, transparent 0),
            linear-gradient(to right, #D8E7B0 1px, transparent 0),
            linear-gradient(to bottom, #D8E7B0 1px, transparent 0)
          `,
          backgroundSize: '60px 60px, 60px 60px, 60px 60px, 4px 4px, 4px 4px',
          backgroundPosition: '-19.5px -19.5px, 0 0, 0 0, 0 0, 0 0',
        }}
      />
      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="relative z-10 container w-full px-0 lg:px-4">
        <div className="flex flex-col items-center gap-0 lg:flex-row lg:gap-10">
          {/* <div className="relative h-100 w-full overflow-hidden rounded-br-4xl rounded-bl-4xl md:h-125 lg:h-175 lg:w-1/2 lg:rounded-bl-none">
            <Image
              src={heroImage}
              alt="Personalized Nutrition Coaching"
              fetchPriority="high"
              decoding="sync"
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div> */}

          <div className="relative h-100 w-full overflow-hidden rounded-br-4xl rounded-bl-4xl md:h-125 lg:h-175 lg:w-1/2 lg:rounded-bl-none">
            <Image
              src={heroImage}
              alt="Personalized Nutrition Coaching"
              fill

              // 🔥 THE LCP FIX:
              priority={true}
              fetchPriority="high" // Lighthouse ki strict demand poori karne ke liye

              // 👇 Desktop par 50% screen width lega, jisse 25 KiB data waste nahi hoga
              sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1000px"
              quality={75}

              // 👇 Static imported image hai toh blur lagana best practice hai (Zero Blink)
              // placeholder="blur"
              decoding="sync"

              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="relative flex w-full flex-col px-4 pt-22 lg:w-1/2 lg:px-0 lg:pt-0">
            <span className="decoration-green-70 text-dark-green-15 text-center text-lg font-semibold underline decoration-[4px] underline-offset-8 lg:text-start lg:text-[22px]">
              Transform Your ❤️ Health with
            </span>

            <h1 className="text-dark-green-15 mt-2.5 text-center text-[38px] leading-12 font-bold lg:text-start lg:text-[48px] lg:leading-14">
              Personalized Nutrition Coaching
            </h1>

            <p className="text-gray-20 mt-4 text-center text-sm font-medium lg:text-start lg:text-[16px]">
              Welcome to Nutritionist, your partner in achieving optimal health through personalized
              nutrition coaching. Our certified nutritionists are here to guide you on your weight
              loss journey, providing customized plans and ongoing support. Start your
              transformation today and experience the power of personalized nutrition coaching.
            </p>

            <div className="mt-7.5 flex w-full justify-center gap-4 py-px lg:mt-10 lg:justify-start">
              <Button className="bg-green-70 hover:bg-green-80 text-gray-15 h-auto! cursor-pointer rounded-sm px-4 py-3 text-sm font-semibold lg:text-[16px]">
                Get Starter Today
              </Button>
              <Button className="border-green-85 text-gray-15 bg-green-95 hover:bg-green-90 h-auto! cursor-pointer rounded-sm border px-4 py-3 text-sm font-semibold lg:text-[16px]">
                Book a Demo
              </Button>
            </div>

            <div className="absolute -top-6.5 left-0 flex w-full flex-col items-center gap-2 lg:static lg:mt-12.5 lg:flex-row">
              {/* <AvatarGroup className="border-green-70 bg-green-97 flex -space-x-2 rounded-full border p-2">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <img
                    src={userOne.src}
                    alt="Happy Customer 1"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <img
                    src={userTwo.src}
                    alt="Happy Customer 2"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <img
                    src={userThree.src}
                    alt="Happy Customer 3"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                </div>
              </AvatarGroup> */}
              <AvatarGroup className="border-green-70 bg-green-97 flex -space-x-2 rounded-full border p-2">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={userOne.src} // Agar userOne imported static image hai, toh sirf 'src={userOne}' bhi likh sakte hain
                    alt="Happy Customer 1"
                    width={40} // size-10 ka actual size 40px hota hai
                    height={40}
                    // priority={true} // Blink/Flash rokne ke liye
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={userTwo.src}
                    alt="Happy Customer 2"
                    width={40}
                    height={40}
                    // priority={true}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={userThree.src}
                    alt="Happy Customer 3"
                    width={40}
                    height={40}
                    // priority={true}
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
