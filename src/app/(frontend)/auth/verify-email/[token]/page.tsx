import VerifyEmailClient from './verify-client'

type PageProps = {
  params: Promise<{ token: string }>
}

export default async function VerifyEmailPage(props: PageProps) {
  const params = await props.params

  return <VerifyEmailClient token={params.token} />
}
