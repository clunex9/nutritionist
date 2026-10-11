import type { User } from '@/payload-types'
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Link,
  Tailwind,
  render,
} from '@react-email/components'
import { hasCmsAccess } from '@/access/roles'

// TypeScript props define karna ek achhi aadat hai
interface ResetPasswordEmailProps {
  user: User
  resetURL: string
}

const ResetPasswordEmailComponent = ({ user, resetURL }: ResetPasswordEmailProps) => {
  return (
    <Tailwind>
      <Html lang="en">
        <Head />
        {/* Inbox me subject ke aage ye text dikhega */}
        <Preview>Reset your NUTRITIONIST account password</Preview>

        <Body className="bg-[#f6f9fc] py-10 font-sans">
          {/* Container automatically layout ko center me rakhta hai aur Outlook me safe rehta hai */}
          <Container className="mx-auto max-w-150 overflow-hidden rounded-lg bg-white shadow-md">
            {/* Header */}
            <Section className="bg-black p-8 text-center">
              <Text className="m-0 text-2xl font-bold text-white">NUTRITIONIST</Text>
            </Section>

            {/* Content */}
            <Section className="p-10 text-[#333333]">
              <Text className="mb-4 text-xl font-semibold">Hi {user?.name || 'there'},</Text>

              <Text className="mb-4 text-base leading-relaxed">
                Password reset karne ke liye niche button par click karein:
              </Text>

              <Section className="py-8 text-center">
                {/* Email safe Button component */}
                <Button
                  href={resetURL}
                  className="inline-block rounded bg-black px-8 py-3 font-bold text-white no-underline"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="m-0 text-sm">
                <strong>Note:</strong> Ye link limited time ke liye valid hai.
              </Text>
            </Section>

            {/* Fallback Link */}
            <Section className="border-t border-[#eee] px-10 py-5">
              <Text className="mb-1 text-xs text-gray-500">Agar button kaam na kare:</Text>
              <Link href={resetURL} className="m-0 text-[13px] break-all text-blue-600">
                {resetURL}
              </Link>
            </Section>
          </Container>

          {/* Footer */}
          <Text className="p-5 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} NUTRITIONIST
          </Text>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const resetPasswordTemplate = async (args: any) => {
  const token = args?.token
  const user = args?.user

  if (!token || !user) {
    return '<p>Invalid reset request</p>'
  }

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const resetURL = hasCmsAccess(user)
    ? `${serverURL}/cms/reset/${token}`
    : `${serverURL}/auth/reset-password/${token}`

  const emailHtml = await render(<ResetPasswordEmailComponent user={user} resetURL={resetURL} />)

  return emailHtml
}
