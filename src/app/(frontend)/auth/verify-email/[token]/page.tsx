import { verifyEmailAction } from '@/actions/auth.action'
import { redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ token: string }>
}

export default async function VerifyEmailPage(props: PageProps) {
  const params = await props.params
  const token = params.token

  // Page load hote hi strictly Payload ke zariye verify karo
  const result = await verifyEmailAction(token)

  if (result.success) {
    // Verify hote hi user ko login page par bhej do
    // URL me query param daal do taaki login page par "Success" message dikha sako
    redirect('/auth/signin?verified=true')
  }

  // Agar fail hua
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center p-10 text-center">
      <h1 className="text-xl font-bold text-red-500">Verification Failed</h1>
      <p className="mt-4 text-sm text-gray-500">
        The link is invalid or has already been used. Please try logging in or registering again.
      </p>
    </div>
  )
}
