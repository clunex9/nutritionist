'use client'

import Link from 'next/link'
// 👇 buttonVariants import karna mat bhoolna
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CTAProps {
  title: string
  description: string
  buttonText: string
  buttonLink?: string
  onClick?: () => void
  className?: string
}

export default function CTA({
  title,
  description,
  buttonText,
  buttonLink,
  onClick,
  className,
}: CTAProps) {
  return (
    <section id="cta" className={cn('scroll-mt-10 py-7.5 lg:py-10', className)}>
      <div className="container">
        <div className="bg-green-95 border-green-85 relative flex flex-col items-center justify-between gap-5 overflow-hidden rounded-lg border p-10 text-center lg:flex-row lg:p-15 lg:text-left">
          {/* Background SVG 1 (Left) */}
          <svg
            width="156"
            height="108"
            viewBox="0 0 156 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0"
          >
            <path
              d="M22.9231 -37.859L102.548 5.66062L22.8944 -19.1628L99.2876 22.5777L-26.7632 -22.5146L154.426 66.6055L-68.814 -15.6194L102.458 64.069L-26.8374 25.6587L78.1809 78.9067L-19.2459 45.8678L43.4915 105.465"
              stroke="#CBEA7B"
              strokeWidth="5.12"
              strokeDasharray="1.35 1.35"
            />
          </svg>

          {/* Dynamic Content */}
          <div className="z-10 flex flex-col gap-5">
            <h2 className="text-gray-15 text-2xl font-semibold">{title}</h2>
            <p className="text-gray-20 font-medium">{description}</p>
          </div>

          {/* Dynamic Button */}
          <div className="z-10 w-full shrink-0 lg:w-fit">
            {buttonLink ? (
              // 👇 Link ko hi seedha buttonVariants de diya gaya hai
              <Link
                href={buttonLink}
                className={cn(
                  buttonVariants(),
                  'bg-green-70 hover:bg-green-80 text-gray-15 h-auto! w-full cursor-pointer rounded-sm px-5 py-3.5 text-sm font-semibold lg:w-fit',
                )}
              >
                {buttonText}
              </Link>
            ) : (
              // 👇 Agar link nahi hai (sirf onClick chalana hai), toh Button waisa hi rahega
              <Button
                onClick={onClick}
                className="bg-green-70 hover:bg-green-80 text-gray-15 h-auto! w-full cursor-pointer rounded-sm px-5 py-3.5 text-sm font-semibold lg:w-fit"
              >
                {buttonText}
              </Button>
            )}
          </div>

          {/* Background SVG 2 (Right) */}
          <svg
            width="127"
            height="111"
            viewBox="0 0 127 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 bottom-0"
          >
            <path
              d="M61.5871 50.1104C42.81 31.8409 55.7442 0 81.9426 0C108.141 0 121.075 31.8409 102.298 50.1105L81.9426 69.9158L61.5871 50.1104Z"
              fill="#EEF8D3"
            />
            <path
              d="M61.7052 113.89C42.9282 132.159 55.8624 164 82.0607 164C108.259 164 121.193 132.159 102.416 113.89L82.0607 94.0842L61.7052 113.89Z"
              fill="#EEF8D3"
            />
            <path
              d="M50.1104 102.413C31.8409 121.19 0 108.256 0 82.0574C0 55.8591 31.8409 42.9249 50.1105 61.7019L69.9158 82.0574L50.1104 102.413Z"
              fill="#EEF8D3"
            />
            <path
              d="M113.89 102.295C132.159 121.072 164 108.138 164 81.9393C164 55.7409 132.159 42.8068 113.89 61.5838L94.0842 81.9393L113.89 102.295Z"
              fill="#EEF8D3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
