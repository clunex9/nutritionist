'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { HugeiconsIcon } from '@hugeicons/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@hugeicons/core-free-icons'

import type { Testimonial, TestimonialAvatar } from '@/payload-types'
import Image from 'next/image'

export default function TestimonialSection({ data = [] }: { data: Testimonial[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  const updateCarouselState = useCallback(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    setIsReady(true)
  }, [api])

  useEffect(() => {
    if (!api) return
    updateCarouselState()
    api.on('select', updateCarouselState)
    api.on('reInit', updateCarouselState)

    return () => {
      api.off('select', updateCarouselState)
      api.off('reInit', updateCarouselState)
    }
  }, [api, updateCarouselState])

  let paginationVisibilityClass = ''
  if (data.length <= 1) {
    paginationVisibilityClass = 'hidden'
  } else if (data.length === 2) {
    paginationVisibilityClass = 'md:hidden'
  } else if (data.length === 3) {
    paginationVisibilityClass = 'lg:hidden'
  }

  if (!data || data.length === 0) return null

  return (
    <section id="testimonial" className="scroll-mt-10 py-7.5 lg:py-10">
      {/* Header */}
      <div className="container">
        <h2 className="text-gray-15 text-center text-[28px] font-bold lg:text-[38px]">
          Our Testimonials
        </h2>
        <p className="text-gray-20 mx-auto mt-2 max-w-2xl text-center text-sm lg:text-[16px]">
          Our satisfied clients share their success stories and experiences on their journey to
          better health and well-being.
        </p>
      </div>

      <div className="container mt-7.5 w-full">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current?.stop()}
          onMouseLeave={() => plugin.current?.play()}
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 'auto',
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {data.map(({ id, avatar, clientName, review }) => {
              const avatarObj =
                typeof avatar === 'object' && avatar !== null ? (avatar as TestimonialAvatar) : null

              const avatarUrl = avatarObj?.thumbnailURL || avatarObj?.url || ''

              const initials = clientName
                ? clientName
                    .trim()
                    .split(/\s+/)
                    .map((n: string) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase()
                : 'U'

              return (
                <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-green-85 bg-green-95 flex h-full flex-col rounded-lg border ring-0">
                    {/* Header (Quotes Icon) */}
                    <CardHeader className="px-7.5">
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path
                          d="M3 28V21.7055C3 19.8953 3.33047 18.0131 3.99142 16.0589C4.67239 14.0842 5.59371 12.2225 6.75536 10.4741C7.93705 8.70501 9.25894 7.21365 10.721 6L15.7682 9.36325C14.5866 11.194 13.5951 13.1071 12.794 15.1024C12.0129 17.0771 11.6323 19.2576 11.6524 21.6438V28H3ZM18.2318 28V21.7055C18.2318 19.8953 18.5622 18.0131 19.2232 16.0589C19.9041 14.0842 20.8255 12.2225 21.9871 10.4741C23.1688 8.70501 24.4907 7.21365 25.9528 6L31 9.36325C29.8183 11.194 28.8269 13.1071 28.0258 15.1024C27.2446 17.0771 26.8641 19.2576 26.8841 21.6438V28H18.2318Z"
                          fill="#356554"
                        />
                      </svg>
                    </CardHeader>

                    {/* Content (Review Text) */}
                    <CardContent className="flex grow items-center justify-center px-7.5">
                      <p className="text-gray-20 font-medium">{review}</p>
                    </CardContent>

                    {/* Footer (Avatar & Name) */}
                    <CardFooter className="border-green-85 bg-green-95 mt-auto flex items-center gap-3 px-7.5 py-5">
                      <Avatar className="bg-dark-green-15 size-10 shrink-0 rounded-md after:border-0 lg:size-12.5">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={clientName}
                            fill
                            sizes="(max-width: 1024px) 40px, 50px"
                            className="h-full w-full rounded-md object-cover"
                          />
                        ) : (
                          <AvatarFallback className="text-green-95 bg-dark-green-15 rounded-md font-bold uppercase">
                            {initials}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <span className="text-dark-green-15 font-semibold">{clientName}</span>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>

        {/* Navigation Controls Container */}
        <div
          className={cn('mt-6 flex items-center justify-center gap-4', paginationVisibilityClass)}
        >
          <div
            className="flex items-center gap-4"
            onMouseEnter={() => plugin.current?.stop()}
            onMouseLeave={() => plugin.current?.play()}
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              className="border-green-85 bg-green-95 hover:bg-green-90 size-10 cursor-pointer rounded-sm lg:size-12.5"
            >
              <HugeiconsIcon icon={ChevronLeftIcon} />
              <span className="sr-only">Previous slide</span>
            </Button>

            <div className="flex justify-center gap-2">
              {Array.from({ length: data.length }).map((_, index) => {
                const hideOnTablet = index >= Math.ceil(data.length / 2)
                const hideOnDesktop = index >= Math.ceil(data.length / 3)

                return (
                  <button
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      'size-4 cursor-pointer rounded-full transition-colors',
                      current === index ? 'bg-dark-green-30' : 'bg-green-75',
                      isReady && index >= count && 'hidden',
                      !isReady && hideOnTablet && 'md:hidden',
                      !isReady && hideOnDesktop && 'lg:hidden',
                    )}
                  />
                )
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              className="border-green-85 bg-green-95 hover:bg-green-90 size-10 cursor-pointer rounded-sm lg:size-12.5"
            >
              <HugeiconsIcon icon={ChevronRightIcon} />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
