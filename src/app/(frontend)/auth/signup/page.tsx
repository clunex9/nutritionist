import { getSafeCallbackUrl } from '@/lib/safe-redirect'
import SignupForm from './signup-form'

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SignupPage(props: PageProps) {
  const searchParams = await props.searchParams

  // 🔒 Open Redirect protection
  const callbackUrl = getSafeCallbackUrl(searchParams?.callbackUrl, '/account/profile')

  return (
    <div className="mx-auto w-full max-w-md">
      <SignupForm callbackUrl={callbackUrl} />
    </div>
  )
}
