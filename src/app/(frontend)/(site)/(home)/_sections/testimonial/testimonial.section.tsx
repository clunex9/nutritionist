'use client'

import React, { useEffect, useState, useCallback, useMemo, memo } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@hugeicons/core-free-icons'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { Testimonial, TestimonialAvatar } from '@/payload-types'

const QuotesIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
    <path
      d="M3 28V21.7055C3 19.8953 3.33047 18.0131 3.99142 16.0589C4.67239 14.0842 5.59371 12.2225 6.75536 10.4741C7.93705 8.70501 9.25894 7.21365 10.721 6L15.7682 9.36325C14.5866 11.194 13.5951 13.1071 12.794 15.1024C12.0129 17.0771 11.6323 19.2576 11.6524 21.6438V28H3ZM18.2318 28V21.7055C18.2318 19.8953 18.5622 18.0131 19.2232 16.0589C19.9041 14.0842 20.8255 12.2225 21.9871 10.4741C23.1688 8.70501 24.4907 7.21365 25.9528 6L31 9.36325C29.8183 11.194 28.8269 13.1071 28.0258 15.1024C27.2446 17.0771 26.8641 19.2576 26.8841 21.6438V28H18.2318Z"
      fill="#356554"
    />
  </svg>
)

const TestimonialCard = memo(({ item, inView }: { item: Testimonial; inView: boolean }) => {
  const { avatar, clientName, review } = item

  const avatarUrl =
    (avatar as TestimonialAvatar)?.url || (avatar as TestimonialAvatar)?.thumbnailURL || ''
  const initials = clientName
    ? clientName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'U'

  const [hasLoaded, setHasLoaded] = useState(false)

  return (
    <Card className="border-green-85 bg-green-95 flex h-full flex-col rounded-lg border ring-0">
      <CardHeader className="px-7.5">
        <QuotesIcon />
      </CardHeader>

      <CardContent className="flex grow items-center justify-center px-7.5">
        <p className="text-gray-20 font-medium">{review}</p>
      </CardContent>

      <CardFooter className="border-green-85 bg-green-95 mt-auto flex items-center gap-3 border-t px-7.5 py-5">
        <Avatar className="bg-dark-green-15 relative size-10 shrink-0 overflow-hidden rounded-md lg:size-12.5">
          {avatarUrl ? (
            inView && (
              <Image
                src={avatarUrl}
                alt={clientName || 'Client'}
                fill
                sizes="(max-width: 1024px) 40px, 50px"
                className={cn(
                  'object-cover transition-opacity duration-300',
                  hasLoaded ? 'opacity-100' : 'opacity-0',
                )}
                onLoad={() => setHasLoaded(true)}
              />
            )
          ) : (
            <AvatarFallback className="bg-dark-green-15 text-green-95 rounded-md font-bold uppercase">
              {initials}
            </AvatarFallback>
          )}

          {avatarUrl && !hasLoaded && <div className="bg-green-85/40 absolute inset-0" />}
        </Avatar>
        <span className="text-dark-green-15 font-semibold">{clientName}</span>
      </CardFooter>
    </Card>
  )
})
TestimonialCard.displayName = 'TestimonialCard'

function CarouselControls({ api }: { api: CarouselApi | undefined }) {
  const [current, setCurrent] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onInit = useCallback(() => {
    if (!api) return
    setScrollSnaps(api.scrollSnapList())
    setCurrent(api.selectedScrollSnap())
  }, [api])

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    onInit()
    api.on('reInit', onInit)
    api.on('select', onSelect)

    return () => {
      api.off('reInit', onInit)
      api.off('select', onSelect)
    }
  }, [api, onInit, onSelect])

  if (scrollSnaps.length <= 1) return null

  // Ye sirf Desktop mouse interaction ke liye hai.
  // Mobile par Embla ka native plugin khud touch start pe stop aur touch end pe play karta hai.
  const handleMouseEnter = () => api?.plugins()?.autoplay?.stop()
  const handleMouseLeave = () => api?.plugins()?.autoplay?.play()

  return (
    <div className="mt-6 flex items-center justify-center">
      <div
        className="flex items-center justify-center gap-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          className="border-green-85 bg-green-95 hover:bg-green-90 size-10 rounded-sm lg:size-12.5"
        >
          <HugeiconsIcon icon={ChevronLeftIcon} />
        </Button>

        <div className="flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'size-4 rounded-full transition-colors',
                current === index ? 'bg-dark-green-30' : 'bg-green-75 cursor-pointer',
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          className="border-green-85 bg-green-95 hover:bg-green-90 size-10 rounded-sm lg:size-12.5"
        >
          <HugeiconsIcon icon={ChevronRightIcon} />
        </Button>
      </div>
    </div>
  )
}

export default function TestimonialSection({ data = [] }: { data: Testimonial[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [slidesInView, setSlidesInView] = useState<number[]>([])

  const plugins = useMemo(
    () => [
      Autoplay({
        delay: 3500,
        // 👇 Sabse bada change yahi hai. False karna zaroori hai mobile touch resume ke liye.
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
    [],
  )

  useEffect(() => {
    if (!api) return

    const updateSlidesInView = () => {
      const visibleSlides = api.slidesInView()

      setSlidesInView((prev) => {
        const inViewArray = [...prev]
        let hasChanged = false

        visibleSlides.forEach((index) => {
          if (!inViewArray.includes(index)) {
            inViewArray.push(index)
            hasChanged = true
          }
        })

        return hasChanged ? inViewArray : prev
      })
    }

    updateSlidesInView()

    api.on('reInit', updateSlidesInView)
    api.on('select', updateSlidesInView)

    return () => {
      api.off('reInit', updateSlidesInView)
      api.off('select', updateSlidesInView)
    }
  }, [api])

  if (!data?.length) return null

  return (
    <section id="testimonial" className="scroll-mt-10 py-7.5 lg:py-10">
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
        {/* Carousel ke upar bhi mouse enter/leave logic add kar diya taki desktop par slider pe pointer le jaane par autoplay ruk jaye */}
        <div
          onMouseEnter={() => api?.plugins()?.autoplay?.stop()}
          onMouseLeave={() => api?.plugins()?.autoplay?.play()}
        >
          <Carousel
            setApi={setApi}
            plugins={plugins}
            opts={{ align: 'start', loop: data.length > 3, slidesToScroll: 'auto' }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {data.map((item, index) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard item={item} inView={slidesInView.includes(index)} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <CarouselControls api={api} />
      </div>
    </section>
  )
}
