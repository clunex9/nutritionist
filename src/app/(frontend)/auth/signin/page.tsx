import SigninForm from './signin-form'

// 👇 TypeScript interface add kiya taaki 'any' na use karna pade
type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SigninPage(props: PageProps) {
  // Next.js 15 ke hisaab se searchParams await ho raha hai (Perfect!)
  const searchParams = await props.searchParams

  // URL se callbackUrl nikalo, agar nahi hai toh default '/account/profile' use karo
  const callbackUrl =
    (typeof searchParams?.callbackUrl === 'string' ? searchParams.callbackUrl : undefined) ||
    '/account/profile'

  // Form ko callbackUrl pass kar do
  return (
    <div className="mx-auto w-full max-w-md">
      <SigninForm callbackUrl={callbackUrl} />
    </div>
  )
}
