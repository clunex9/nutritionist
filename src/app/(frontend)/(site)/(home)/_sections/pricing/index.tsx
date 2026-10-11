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
  return (
    <section id="pricing" className="scroll-mt-10 py-7.5 lg:py-10">
      <div className="container">
        <h2 className="text-gray-15 text-center text-[28px] font-bold lg:text-[38px]">
          Our Pricing
        </h2>
        <p className="text-gray-20 text-center text-sm lg:text-[16px]">
          We outline our flexible and affordable options to support you on your journey to optimal
          health and nutrition. We believe that everyone deserves access to personalized nutrition
          guidance and resources.
        </p>
      </div>

      <div className="container mt-7.5">
        <Tabs defaultValue="Monthly" className="flex w-full flex-col items-center gap-0">
          {/* ── Tabs Toggle ── */}
          <div className="flex flex-col items-center gap-2.5">
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

          {/* ── Har Tab Content ke liye Grid ── */}
          {pricingTabs.map(({ value, plans }) => (
            <TabsContent key={value} value={value} className="mt-7.5 w-full">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className="border-green-85 bg-green-95 flex flex-col overflow-hidden rounded-lg border p-7.5! ring-0"
                  >
                    <CardHeader className="mb-2 p-0">
                      <CardTitle className="text-gray-15 text-2xl font-semibold">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-gray-30 font-medium">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="grow p-0">
                      <p className="text-gray-15 text-sm leading-relaxed font-medium lg:text-base">
                        {plan.content}
                      </p>
                    </CardContent>

                    <CardFooter className="mt-5 flex flex-col gap-6 border-0 p-0">
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
