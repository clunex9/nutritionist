import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import lightLogo from '@/assets/svg/light-logo.svg'
import plus from '@/assets/svg/plus.svg'

export default function FAQ() {
  const items = [
    {
      value: 'item-1',
      trigger: 'How do I reset my password?',
      content:
        "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
    },
    {
      value: 'item-2',
      trigger: 'Can I change my subscription plan?',
      content:
        'Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.',
    },
    {
      value: 'item-3',
      trigger: 'What payment methods do you accept?',
      content:
        'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.',
    },
    {
      value: 'item-4',
      trigger: 'Are the meal plans customized for vegetarians?',
      content:
        'Absolutely! When you set up your profile, you can select your dietary preferences, including vegetarian, vegan, keto, or gluten-free, and your daily meal plans will be tailored accordingly.',
    },
    {
      value: 'item-5',
      trigger: 'Can I sync my fitness watch with the app?',
      content:
        "Yes, our platform integrates seamlessly with Apple Health, Google Fit, Fitbit, and Garmin. You can connect your device in the 'Integrations' section of your profile settings.",
    },
    {
      value: 'item-6',
      trigger: 'How can I book a 1-on-1 consultation with a nutritionist?',
      content:
        "Go to the 'Experts' tab on your menu, select a nutritionist whose profile matches your goals, and pick an available time slot from their calendar to book your live video session.",
    },
  ]
  return (
    <section id="faq" className="scroll-mt-10 py-7.5 lg:py-10">
      <div className="container">
        <h2 className="text-gray-15 text-center text-2xl font-bold lg:text-4xl">FAQ</h2>
        <p className="text-gray-20 mx-auto mt-2 max-w-3xl text-center text-sm lg:text-base">
          We address commonly asked questions and provide comprehensive answers to help you navigate
          your way through your nutrition and wellness journey.
        </p>
      </div>

      <div className="container mt-7.5 flex flex-col items-start gap-6 lg:flex-row">
        {/* ── Accordion Box (Takes 2/3 space on large screens) ── */}
        <div className="bg-green-95 border-green-85 w-full rounded-lg border p-6 lg:w-2/3 lg:p-10">
          {/* Added 'collapsible' so the open item can be closed */}
          <Accordion defaultValue={['item-1']} className="w-full border-0">
            {items.map((item, index) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border-green-85 bg-green-95! py-2"
              >
                <AccordionTrigger className="text-gray-15 font text-lg font-medium hover:no-underline aria-expanded:font-semibold **:data-[slot=accordion-trigger-icon]:hidden">
                  {item.trigger}
                  <div className="text-dark-green-40 bg-dark-green-15 shrink-0 rounded-md p-1">
                    <Image
                      src={plus}
                      alt="plus-icon"
                      width={20}
                      height={20}
                      className="text-green-95 size-5 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45"
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-20 text-base font-medium lg:pr-14">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* ── Ask Question Box (Takes 1/3 space on large screens) ── */}
        <div className="bg-green-95 border-green-85 flex w-full flex-col items-center justify-center gap-6 rounded-lg border p-6 text-center lg:w-1/3 lg:gap-10 lg:p-10">
          <div>
            <Image src={lightLogo} alt="light-logo" width={100} height={100} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-15 text-2xl font-semibold">Ask your question</span>
            <span className="text-gray-20 text-sm font-medium">
              Feel free to ask questions anytime.
            </span>
          </div>

          <Button className="bg-green-70 hover:bg-green-80 text-gray-15 mt-2 h-auto! w-full cursor-pointer rounded-sm px-6 py-4 text-sm font-semibold transition-colors">
            Ask A Question
          </Button>
        </div>
      </div>
    </section>
  )
}
