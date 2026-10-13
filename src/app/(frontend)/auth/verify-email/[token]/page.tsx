import { verifyEmailAction } from '@/actions/auth.action'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers' // 👈 Ye import add karein

type PageProps = {
  params: Promise<{ token: string }>
}

export default async function VerifyEmailPage(props: PageProps) {
  const params = await props.params
  const token = params.token

  const result = await verifyEmailAction(token)

  if (result.success) {
    // ✅ Cookie read karein
    const cookieStore = await cookies()
    const storedCallbackUrl = cookieStore.get('pending-callback-url')?.value

    // Agar cookie mili, toh use karein. Nahi toh default profile de dein.
    const destination = storedCallbackUrl || '/account/profile'

    // Cookie ko delete kar dein kyunki ab iski zaroorat nahi
    cookieStore.delete('pending-callback-url')

    // Login page par redirect karein with both parameters
    redirect(`/auth/signin?verified=true&callbackUrl=${encodeURIComponent(destination)}`)
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center p-10 text-center">
      <h1 className="text-xl font-bold text-red-500">Verification Failed</h1>
      <p className="mt-4 text-sm text-gray-500">
        The link is invalid or has already been used. Please try logging in or registering again.
      </p>
    </div>
  )
}
