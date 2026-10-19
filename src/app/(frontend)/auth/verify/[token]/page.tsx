// import VerifyEmailClient from './verify-client'

// type PageProps = {
//   params: Promise<{ token: string }>
// }

// export default async function VerifyEmailPage(props: PageProps) {
//   const params = await props.params
//   return <VerifyEmailClient token={params.token} />
// }

import { Suspense } from 'react'
import VerifyEmailClient from './verify-client'

type PageProps = {
  params: Promise<{ token: string }>
}

// 1. Ek naya async Server Component banayein jo params ka wait karega
async function TokenLoader({ paramsPromise }: { paramsPromise: Promise<{ token: string }> }) {
  const params = await paramsPromise
  return <VerifyEmailClient token={params.token} />
}

// 2. Main page ko synchronous rakhein aur Suspense use karein
export default function VerifyEmailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center p-10">
          <div className="border-t-green-70 h-8 w-8 animate-spin rounded-full border-4 border-white/10"></div>
        </div>
      }
    >
      <TokenLoader paramsPromise={props.params} />
    </Suspense>
  )
}
