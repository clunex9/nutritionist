// import { SessionExpiredNotice } from './session-expired-notice'
import SigninForm from './signin-form'
// import { getSafeCallbackUrl } from '@/lib/safe-redirect'

// 👇 TypeScript interface add kiya taaki 'any' na use karna pade
type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SigninPage(props: PageProps) {
  // Next.js 15 ke hisaab se searchParams await ho raha hai (Perfect!)
  const searchParams = await props.searchParams
  const callbackUrl =
    (typeof searchParams?.callbackUrl === 'string' ? searchParams.callbackUrl : undefined) ||
    '/account/profile'
  // const callbackUrl = getSafeCallbackUrl(searchParams?.callbackUrl)
  // const reason = typeof searchParams?.reason === 'string' ? searchParams.reason : undefined

  // Form ko callbackUrl pass kar do
  return (
    <div className="mx-auto w-full max-w-md">
      {/* <SessionExpiredNotice reason={reason} /> */}
      <SigninForm callbackUrl={callbackUrl} />
    </div>
  )
}
