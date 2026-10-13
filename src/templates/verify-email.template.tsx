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

// Props define kar rahe hain
interface VerifyEmailProps {
  user: User
  verifyURL: string
}

const VerifyEmailComponent = ({ user, verifyURL }: VerifyEmailProps) => {
  return (
    <Tailwind>
      <Html lang="en">
        <Head />
        {/* Inbox me subject ke aage ye text dikhega */}
        <Preview>Verify your NUTRITIONIST account email</Preview>

        <Body className="bg-[#f6f9fc] py-10 font-sans">
          {/* Main Container */}
          <Container className="mx-auto max-w-150 overflow-hidden rounded-lg bg-white shadow-md">
            {/* Header */}
            <Section className="bg-black p-8 text-center">
              <Text className="m-0 text-2xl font-bold text-white">NUTRITIONIST</Text>
            </Section>

            {/* Content */}
            <Section className="p-10 text-[#333333]">
              <Text className="mb-4 text-xl font-semibold">
                Welcome {user?.name || 'there'}! 🎉
              </Text>

              <Text className="mb-4 text-base leading-relaxed">
                NUTRITIONIST par register karne ke liye shukriya. Apna account activate karne aur
                email verify karne ke liye niche button par click karein:
              </Text>

              <Section className="py-8 text-center">
                {/* Verification Button */}
                <Button
                  href={verifyURL}
                  className="inline-block rounded bg-black px-8 py-3 font-bold text-white no-underline"
                >
                  Verify Email
                </Button>
              </Section>

              <Text className="m-0 text-sm text-gray-600">
                <strong>Note:</strong> Agar aapne ye account create nahi kiya hai, toh aap is email
                ko ignore kar sakte hain.
              </Text>
            </Section>

            {/* Fallback Link */}
            <Section className="border-t border-[#eee] px-10 py-5">
              <Text className="mb-1 text-xs text-gray-500">
                Agar button kaam na kare, toh is link ko browser me copy-paste karein:
              </Text>
              <Link href={verifyURL} className="m-0 text-[13px] break-all text-blue-600">
                {verifyURL}
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

export const verifyEmailTemplate = async (args: any) => {
  const token = args?.token
  const user = args?.user

  if (!token || !user) {
    return '<p>Invalid verification request</p>'
  }

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // User ke role ke hisaab se verification route decide karna
  const verifyURL = hasCmsAccess(user)
    ? `${serverURL}/cms/verify/${token}`
    : `${serverURL}/auth/verify-email/${token}` // Aap apne frontend route ke hisaab se is path ko adjust kar sakte hain

  // React Email component ko HTML string me render karna
  const emailHtml = await render(<VerifyEmailComponent user={user} verifyURL={verifyURL} />)

  return emailHtml
}
