'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

type PricingPlan = {
  name: string
  description: string
  content: string
  price: number
}

type PricingTab = {
  label: string
  value: string
  plans: PricingPlan[]
}

const pricingTabs: PricingTab[] = [
  {
    label: 'Monthly',
    value: 'Monthly',
    plans: [
      {
        name: 'Basic Plan',
        description: 'Perfect for beginners starting out.',
        content:
          'Get started on your health journey with our Basic Plan. It includes personalized nutrition coaching, access to our app, meal planning assistance, and email support.',
        price: 49,
      },
      {
        name: 'Premium Plan',
        description: 'Best value for dedicated individuals.',
        content:
          'Take your health to the next level. Includes everything in Basic, plus weekly 1-on-1 video calls, advanced biometric tracking, and priority support.',
        price: 89,
      },
      {
        name: 'Ultimate Plan',
        description: 'Comprehensive care for maximum results.',
        content:
          'Experience complete transformation. Includes daily check-ins, custom grocery delivery integration, DNA-based diet planning, and 24/7 VIP support.',
        price: 129,
      },
    ],
  },
  {
    label: 'Yearly',
    value: 'Yearly',
    plans: [
      {
        name: 'Basic Plan',
        description: 'Perfect for beginners starting out.',
        content:
          'Get started on your health journey with our Basic Plan. It includes personalized nutrition coaching, access to our app, meal planning assistance, and email support.',
        price: 24,
      },
      {
        name: 'Premium Plan',
        description: 'Best value for dedicated individuals.',
        content:
          'Take your health to the next level. Includes everything in Basic, plus weekly 1-on-1 video calls, advanced biometric tracking, and priority support.',
        price: 44,
      },
      {
        name: 'Ultimate Plan',
        description: 'Comprehensive care for maximum results.',
        content:
          'Experience complete transformation. Includes daily check-ins, custom grocery delivery integration, DNA-based diet planning, and 24/7 VIP support.',
        price: 64,
      },
    ],
  },
]

export default function Pricing() {
  const pricingRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section Header Animation
      gsap.to('.pricing-header > *', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pricing-header',
          start: 'top 80%', // Header viewport mein aate hi chalega
          toggleActions: 'play none none reverse',
        },
      })

      // 2. Tabs Control (Monthly/Yearly Toggle) Animation
      gsap.to('.pricing-tabs-control', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pricing-tabs-control',
          start: 'top 85%', // Thoda sa scroll karne par toggle button aayega
          toggleActions: 'play none none reverse',
        },
      })

      // 3. Card ka Outer Box (Background aur Border)
      gsap.utils.toArray<HTMLElement>('.pricing-card').forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%', // Jaise hi card ka dabba screen touch kare (Sabse pehle yeh trigger hoga)
            toggleActions: 'play none none reverse',
          },
        })
      })

      // 4. Card ke andar ka Content (Title, Price, Button)
      gsap.utils.toArray<HTMLElement>('.animate-item').forEach((item) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%', // Jab content screen mein thoda andar aa jaye tab trigger ho (Late trigger)
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, pricingRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={pricingRef} id="pricing" className="scroll-mt-10 py-7.5 lg:py-10">
      {/* Step 1: Pricing Header */}
      <div className="pricing-header container">
        <h2 className="text-gray-15 translate-y-10 text-center text-[28px] font-bold opacity-0 lg:text-[38px]">
          Our Pricing
        </h2>
        <p className="text-gray-20 translate-y-10 text-center text-sm opacity-0 lg:text-[16px]">
          We outline our flexible and affordable options to support you on your journey to optimal
          health and nutrition. We believe that everyone deserves access to personalized nutrition
          guidance and resources.
        </p>
      </div>

      <div className="container mt-7.5">
        <Tabs defaultValue="Monthly" className="flex w-full flex-col items-center gap-0">
          {/* Step 2: Tabs Toggle Buttons */}
          <div className="pricing-tabs-control flex translate-y-10 flex-col items-center gap-2.5 opacity-0">
            <TabsList className="border-green-85 bg-green-95 h-auto! rounded-md border p-2.5">
              {pricingTabs.map(({ label, value }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="data-active:bg-dark-green-20 data-active:text-background data-active:hover:text-green-97 h-auto! rounded-sm px-6 py-2.5 text-sm font-semibold transition-all"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            <p className="text-gray-30 text-center font-medium">Save 50% on Yearly</p>
          </div>

          {/* Step 3 & 4: Cards aur unka Content */}
          {pricingTabs.map(({ value, plans }) => (
            <TabsContent key={value} value={value} className="mt-7.5 w-full">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className="pricing-card border-green-85 bg-green-95 flex translate-y-10 flex-col overflow-hidden rounded-lg border p-7.5! opacity-0 ring-0"
                  >
                    <CardHeader className="animate-item mb-2 translate-y-6 p-0 opacity-0">
                      <CardTitle className="text-gray-15 text-2xl font-semibold">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-gray-30 font-medium">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="animate-item grow translate-y-6 p-0 opacity-0">
                      <p className="text-gray-15 text-sm leading-relaxed font-medium lg:text-base">
                        {plan.content}
                      </p>
                    </CardContent>

                    <CardFooter className="animate-item mt-5 flex translate-y-6 flex-col gap-6 border-0 p-0 opacity-0">
                      <div className="flex items-baseline gap-1 self-start">
                        <span className="text-dark-green-25 text-[40px] leading-none font-bold">
                          ${plan.price}
                        </span>
                        <span className="text-gray-20 font-medium">/month</span>
                      </div>
                      <Button className="text-gray-15 bg-green-70 hover:bg-green-80 h-auto! w-full cursor-pointer rounded-sm py-4 text-sm transition-colors">
                        Choose Plan
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
