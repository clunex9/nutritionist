import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import ball from '@/assets/svg/ball.svg'
import Image from 'next/image'
import abstractLine from '@/assets/svg/abstract-line.svg'

export default function Banner() {
  return (
    <div className="border-b-dark-green-25 bg-dark-green-15 relative flex items-center overflow-hidden border border-t-transparent border-r-transparent border-l-transparent py-4">
      <Image
        src={abstractLine}
        alt="left-abstract-line"
        width={100}
        height={100}
        className="absolute -bottom-3 -left-10 block scale-x-[-1] md:hidden"
      />

      <Image
        src={abstractLine}
        alt="left-abstract-line"
        width={100}
        height={100}
        className="absolute -right-10 -bottom-3 block md:hidden"
      />

      <div className="container">
        <div className="bg-dark-green-20 border-dark-green-25 text-background relative flex h-10 w-full items-center justify-center gap-4 overflow-hidden rounded-md border font-medium">
          <Image
            src={abstractLine}
            alt="left-abstract-line"
            width={100}
            height={100}
            className="absolute -top-3 left-5 hidden scale-x-[-1] md:block lg:left-15"
          />

          <Image
            src={abstractLine}
            alt="left-abstract-line"
            width={100}
            height={100}
            className="absolute -top-3 right-5 hidden md:block lg:right-15"
          />

          <Image src={ball} alt="ball" width={20} height={20} />

          <Link href={'/'} className="text-xs lg:text-[16px]">
            Join Our Personalized Nutrition Demo For Free
          </Link>
          <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
        </div>
      </div>
    </div>
  )
}
