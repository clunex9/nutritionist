import Link from 'next/link'
import Image from 'next/image'
import lightLogo from '@/assets/svg/light-logo.svg'
import logoBrandName from '@/assets/svg/logo-brand-name.svg'

export default function FooterLogo() {
  return (
    <Link
      href="/"
      aria-label="Go to Nutritionist Home"
      className="relative z-40 flex items-center justify-center gap-2"
    >
      <Image src={lightLogo} alt="light-logo" width={34} height={34} />
      <Image src={logoBrandName} alt="light-logo" width={100} height={20} />
    </Link>
  )
}
