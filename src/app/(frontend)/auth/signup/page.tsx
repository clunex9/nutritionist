// import { getSafeCallbackUrl } from '@/lib/safe-redirect'
import SignupForm from './signup-form' // 👈 Apne form component ka sahi path daalna

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SignupPage(props: PageProps) {
  // Next.js 15 mein searchParams asynchronous hota hai, isliye isko await karna best practice hai
  const searchParams = await props.searchParams

  // URL se callbackUrl nikalo, agar nahi hai toh default '/account/profile' use karo
  const callbackUrl =
    (typeof searchParams?.callbackUrl === 'string' ? searchParams.callbackUrl : undefined) ||
    '/account/profile'
  // Sirf same-site relative path allow hai, warna default '/account/profile'
  // const callbackUrl = getSafeCallbackUrl(searchParams?.callbackUrl)

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Client Component ko callbackUrl prop pass kar diya */}
      <SignupForm callbackUrl={callbackUrl} />
    </div>
  )
}
