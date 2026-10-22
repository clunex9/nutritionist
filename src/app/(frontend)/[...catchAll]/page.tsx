// import { notFound } from 'next/navigation'

// export default function page() {
//   notFound()
// }

import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export default async function CatchAll({ params }: PageProps) {
  // Params ko resolve kiya
  const resolvedParams = await params

  // Safety check: Agar slug undefined ho toh crash hone se bachane ke liye
  const slugPath = resolvedParams.slug ? resolvedParams.slug.join('/') : ''

  // TODO: Yahan aap baad mein Payload CMS se page data fetch karoge
  const pageData = null // Abhi testing ke liye isko null rakha hai

  // Yeh securely aapka custom 404 page trigger karega aur strict 404 status code dega
  if (!pageData) {
    notFound()
  }

  // Agar page mil gaya toh uska content render hoga
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold">Dynamic Page: /{slugPath}</h1>
    </div>
  )
}
