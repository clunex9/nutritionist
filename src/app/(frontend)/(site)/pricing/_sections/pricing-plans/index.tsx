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
  content: string[]
  extraNote?: string
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
        content: [
          'Personalized nutrition plan tailored to your goals and dietary preferences.',
          'Access to our mobile app for convenient meal tracking and progress monitoring.',
          'Email support to address your questions and concerns.',
          'Regular check-ins with a dedicated nutritionist to review your progress and provide guidance.',
        ],
        price: 49,
      },
      {
        name: 'Premium Plan',
        description: 'Best value for dedicated individuals.',
        content: [
          'All the features included in the Basic Plan.',
          'One-on-one video consultations with your dedicated nutritionist for more personalized guidance and support.',
          'Recipe recommendations and meal planning assistance.',
          'Priority email support for quicker responses to your inquiries.',
          'Educational resources and guides to deepen your understanding of nutrition and healthy habits.',
        ],
        price: 89,
      },
      {
        name: 'Ultimate Plan',
        description: 'Comprehensive care for maximum results.',
        content: [
          'All the features included in the Plus Plan.',
          'Unlimited access to video consultations with your dedicated nutritionist for ongoing support and accountability.',
          'Advanced progress tracking tools to monitor your weight, body measurements, and fitness goals.',
          'Customized meal plans and recipe suggestions based on your preferences and nutritional needs.',
          'Priority email and phone support for immediate assistance.',
        ],
        extraNote:
          'The Premium Plan is designed for individuals who are committed to achieving significant results and require the highest level of support and personalization.',
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
        content: [
          'Personalized nutrition plan tailored to your goals and dietary preferences.',
          'Personalized nutrition plan tailored to your goals and dietary preferences.',
        ],
        price: 24,
      },
      {
        name: 'Premium Plan',
        description: 'Best value for dedicated individuals.',
        content: [
          'Personalized nutrition plan tailored to your goals and dietary preferences.',
          'Personalized nutrition plan tailored to your goals and dietary preferences.',
        ],
        price: 44,
      },
      {
        name: 'Ultimate Plan',
        description: 'Comprehensive care for maximum results.',
        content: [
          'Personalized nutrition plan tailored to your goals and dietary preferences.',
          'Personalized nutrition plan tailored to your goals and dietary preferences.',
        ],
        price: 64,
      },
    ],
  },
]

export default function PricingPlans() {
  return (
    <section id="pricing-plans" className="scroll-mt-10 py-7.5 lg:py-10">
      <div className="container">
        <Tabs defaultValue="Monthly" className="flex w-full flex-col items-center gap-0">
          {/* ── Tabs Toggle ── */}
          <div className="flex flex-col items-center gap-2.5">
            <TabsList className="border-green-85 bg-green-95 h-auto! rounded-md border p-2.5">
              {pricingTabs.map(({ label, value }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="data-active:bg-dark-green-20 data-active:hover:text-green-95 data-active:text-background h-auto! rounded-sm px-6 py-2.5 text-sm font-semibold transition-all"
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
              {/* CHANGE 1: Added 'items-start' to prevent cards from stretching to equal height */}
              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className="border-green-85 bg-green-95 flex flex-col overflow-hidden rounded-lg border p-7.5! ring-0"
                  >
                    <CardHeader className="mb-6 p-0">
                      <CardTitle className="text-gray-15 text-2xl font-semibold">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-gray-30 mt-2 font-medium">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4 p-0">
                      {/* 1. Light Green Features Box */}
                      <div className="bg-green-90 border-green-80 rounded-md border">
                        {plan.content.map((c, i) => (
                          <p
                            key={i}
                            className="text-gray-15 border-green-80 border-b p-4 text-sm leading-relaxed font-medium last:border-b-0 lg:text-base"
                          >
                            {c}
                          </p>
                        ))}
                      </div>

                      {/* 2. Dark Green Extra Note Box (Ab CardContent ke andar hai) */}
                      {plan.extraNote && (
                        <div className="bg-dark-green-20 text-background rounded-md p-5 text-sm leading-relaxed font-medium">
                          {plan.extraNote}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="mt-6 flex flex-col gap-6 border-0 p-0">
                      <div className="flex items-baseline gap-1 self-start">
                        <span className="text-dark-green-25 text-4xl leading-none font-bold">
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
