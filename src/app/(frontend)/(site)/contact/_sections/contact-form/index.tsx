'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { toast } from '@/components/ui/toast'
import { submitContactForm } from '@/actions/contact.action'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import Image from 'next/image'
import mapBg from '@/assets/svg/map-bg.svg'
import mail from '@/assets/svg/mail.svg'
import call from '@/assets/svg/call.svg'
import pin from '@/assets/svg/pin.svg'
import facebook from '@/assets/svg/facebook.svg'
import twitter from '@/assets/svg/twitter.svg'
import linkedin from '@/assets/svg/linkedin.svg'
import { cn } from 'cn'

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must be at most 50 characters.'),
  email: z.email('Please enter a valid email address.'),
  phone: z
    .string()
    .regex(/^\d+$/, 'Phone number must contain only numbers.')
    .min(10, 'Phone number must be at least 10 digits.')
    .max(10, 'Phone number must be at most 10 digits.'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(250, 'Message must be at most 250 characters.'),
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await submitContactForm(data)

    if (response.success) {
      toast.add({
        title: 'Success!',
        description: response.message,
        type: 'success',
      })
      form.reset()
    } else {
      toast.add({
        title: 'Error',
        description: response.message,
        type: 'error',
      })
    }
  }

  const { isSubmitting } = form.formState

  return (
    <section id="contact-form" className="scroll-mt-10 pb-7.5 lg:pb-10">
      <div className="container">
        <div className="bg-dark-green-15 flex flex-col items-center justify-center gap-5 rounded-br-lg rounded-bl-lg p-7.5 md:flex-row lg:gap-7.5 lg:px-15 lg:py-10">
          <Link
            href="mailto:support@nutritionist.com"
            className="bg-dark-green-20 border-dark-green-25 hover:bg-dark-green-25 text-background flex w-full flex-col items-center justify-center gap-4 rounded-sm border p-5 md:w-auto md:p-6 lg:w-full"
          >
            <Image src={mail} alt="mail" width={26} height={26} />

            <span>support@nutritionist.com</span>
          </Link>
          <Link
            href="tel:+910000000000"
            className="bg-dark-green-20 border-dark-green-25 hover:bg-dark-green-25 text-background flex w-full flex-col items-center justify-center gap-4 rounded-sm border p-5 md:w-auto md:p-6 lg:w-full"
          >
            <Image src={call} alt="call" width={26} height={26} />

            <span>+91 00000 00000</span>
          </Link>
          <Link
            href="https://maps.google.com/?q=Some+Where+in+the+World"
            target="_blank"
            className="bg-dark-green-20 border-dark-green-25 hover:bg-dark-green-25 text-background flex w-full flex-col items-center justify-center gap-4 rounded-sm border p-5 md:w-auto md:p-6 lg:w-full"
          >
            <Image src={pin} alt="pin" width={26} height={26} />

            <span>Some Where in the World</span>
          </Link>
        </div>
      </div>

      <div className="container mt-7.5 lg:mt-10">
        <Card className="bg-green-95 border-green-85 w-full rounded-lg border p-7.5 ring-0 md:p-10 lg:p-15">
          <CardContent className="grid grid-cols-1 gap-10 p-0 md:grid-cols-2">
            {/* Left Side - Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <FieldGroup>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="name" className="text-gray-30 font-semibold">
                          Full Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          required
                          placeholder="Enter your Name"
                          className="bg-green-90 border-green-80 focus-visible:ring-green-90 focus-visible:border-green-70 h-10 rounded-sm border transition-all duration-200 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:black] focus-visible:ring-3"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="email" className="text-gray-30 font-semibold">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          required
                          placeholder="Enter your Email"
                          className="bg-green-90 border-green-80 focus-visible:ring-green-90 focus-visible:border-green-70 h-10 rounded-sm border transition-all duration-200 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:black] focus-visible:ring-3"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="phone" className="text-gray-30 font-semibold">
                          Phone Number
                        </FieldLabel>
                        <Input
                          {...field}
                          id="phone"
                          type="tel"
                          required
                          inputMode="numeric"
                          placeholder="Enter your Number"
                          className="bg-green-90 border-green-80 focus-visible:ring-green-90 focus-visible:border-green-70 h-10 rounded-sm border transition-all duration-200 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:black] focus-visible:ring-3"
                          onChange={(e) => {
                            // सिर्फ नंबर्स (0-9) को अलाव करें, बाकी सब हटा दें
                            const numericValue = e.target.value.replace(/[^0-9]/g, '')
                            // उस क्लीन वैल्यू को react-hook-form में पास करें
                            field.onChange(numericValue)
                          }}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="message" className="text-gray-30 font-semibold">
                          Message
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="message"
                          placeholder="Enter your Message"
                          maxLength={250}
                          required
                          className={`bg-green-90 border-green-80 focus-visible:ring-green-90 focus-visible:border-green-70 h-10 min-h-45 resize-none rounded-sm border transition-all duration-200 ease-in-out autofill:transition-colors autofill:duration-[9999s] autofill:[-webkit-text-fill-color:black] focus-visible:ring-3 xl:min-h-48 2xl:min-h-73`}
                        />

                        <div className="flex items-start justify-between">
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          <div className="ml-auto text-right text-sm text-gray-500">
                            {field.value?.length || 0} / 250
                          </div>
                        </div>
                      </Field>
                    )}
                  />
                </div>

                <Field>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-70 hover:bg-green-80 text-gray-15 h-10 w-full cursor-pointer rounded-sm text-base font-semibold"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Field>
              </FieldGroup>
            </form>

            {/* Right Side - Map and Social Icons */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-560/435 w-full grow overflow-hidden rounded-md">
                <Image
                  src={mapBg}
                  alt="World Map Location"
                  fill
                  className="object-cover"
                  priority // Initial viewport mein hai isliye priority zaroori hai
                />
              </div>

              {/* Social Icons (Desktop only) */}
              <div className="flex justify-center gap-4 md:justify-end">
                <SocialIcons />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

const SocialIcons = () => (
  <>
    <Link
      href="#"
      className={cn(
        buttonVariants(),
        'bg-green-70 hover:bg-green-80! size-10 rounded-sm text-gray-900',
      )}
    >
      <Image src={facebook} alt="facebook" width={26} height={26} />
    </Link>

    <Link
      href="#"
      className={cn(
        buttonVariants(),
        'bg-green-70 hover:bg-green-80! size-10 rounded-sm text-gray-900',
      )}
    >
      <Image src={twitter} alt="twiiter" width={26} height={26} />
    </Link>
    <Link
      href="#"
      className={cn(
        buttonVariants(),
        'bg-green-70 hover:bg-green-80! size-10 rounded-sm text-gray-900',
      )}
    >
      <Image src={linkedin} alt="linkedin" width={26} height={26} />
    </Link>
  </>
)
