'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import abstractLine from '@/assets/svg/abstract-line.svg'
import abstractShape from '@/assets/svg/abstracr-shape.svg'

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
          <Image
            src={abstractLine}
            alt="abstract-line"
            width={200}
            height={200}
            className="absolute -top-10 -left-10"
          />

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

          <Image
            src={abstractShape}
            alt="abstract-shape"
            width={150}
            height={150}
            className="absolute -right-10 -bottom-10"
          />
        </div>
      </div>
    </section>
  )
}
