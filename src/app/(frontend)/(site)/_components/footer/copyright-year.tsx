import { connection } from 'next/server'

export default async function CopyrightYear() {
  await connection()
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>
}
