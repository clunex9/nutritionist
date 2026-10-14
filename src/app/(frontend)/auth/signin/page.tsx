// src/app/(frontend)/auth/signin/page.tsx
import SigninForm from './signin-form'
import { getSafeCallbackUrl } from '@/lib/safe-redirect'

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SigninPage(props: PageProps) {
  const searchParams = await props.searchParams
  const callbackUrl = getSafeCallbackUrl(searchParams?.callbackUrl, '/account/profile')

  return (
    <div className="mx-auto w-full max-w-md">
      <SigninForm callbackUrl={callbackUrl} />
    </div>
  )
}
