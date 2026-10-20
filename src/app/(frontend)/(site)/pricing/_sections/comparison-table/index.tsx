import Image from 'next/image'
import check from '@/assets/svg/check.svg'
import cross from '@/assets/svg/cross.svg'

const CheckIcon = ({ className }: { className?: string }) => (
  <Image src={check} alt="check" width={28} height={28} className={`mx-auto ${className}`} />
)

const CrossIcon = ({ className }: { className?: string }) => (
  <Image src={cross} alt="cross" width={28} height={28} className={`mx-auto ${className}`} />
)

// 2. Data array bana diya
const tableData = [
  {
    feature: 'Personalized Nutrition Plan',
    basic: true,
    premium: true,
    ultimate: true,
  },
  {
    feature: 'Mobile App Access',
    basic: true,
    premium: true,
    ultimate: true,
  },
  {
    feature: 'Email Support',
    basic: true,
    premium: true,
    ultimate: true,
  },
  {
    feature: 'One -on One Video Consultations',
    basic: false,
    premium: true,
    ultimate: true,
  },
  {
    feature: 'Recipe Recommendations and Meal Planning',
    basic: false,
    premium: true,
    ultimate: true,
  },
  {
    feature: 'Priority Support',
    basic: false,
    premium: true,
    ultimate: true,
  },
  {
    feature: 'Educational Resources and Guides',
    basic: false,
    premium: true,
    ultimate: true,
  },
  {
    feature: 'Customized Meal Plans and Recipe Suggestions',
    basic: false,
    premium: true,
    ultimate: true,
  },
  {
    feature: 'Phone Support',
    basic: false,
    premium: false,
    ultimate: true,
  },
  {
    feature: 'Advanced Progress Tracking Tools',
    basic: false,
    premium: false,
    ultimate: true,
  },
]

export default function ComparisonTable() {
  return (
    <section id="comparison-table" className="scroll-mt-10 py-7.5 lg:py-10">
      <div className="container">
        <div className="bg-green-95 border-green-85 overflow-x-auto rounded-lg border p-8">
          <table className="w-full border-collapse">
            <thead className="whitespace-nowrap">
              <tr>
                <th className="w-2/5 py-4 pr-4 text-left align-top font-normal">
                  <div className="bg-dark-green-20 text-background inline-block w-full rounded-md px-8 py-2.5">
                    Features
                  </div>
                </th>
                <th className="border-green-85 w-1/5 border-l p-4 text-center align-top font-normal">
                  <div className="bg-dark-green-20 text-background inline-block w-full rounded-md px-8 py-2.5">
                    Basic Plan
                  </div>
                </th>
                <th className="border-green-85 w-1/5 border-l p-4 text-center align-top font-normal">
                  <div className="bg-dark-green-20 text-background inline-block w-full rounded-md px-8 py-2.5">
                    Premium Plan
                  </div>
                </th>
                <th className="border-green-85 w-1/5 border-l py-4 pl-4 text-center align-top font-normal">
                  <div className="bg-dark-green-20 text-background inline-block w-full rounded-md px-8 py-2.5">
                    Ultimate Plan
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {/* 3. Data array pe map laga kar rows render ki */}
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={index !== tableData.length - 1 ? 'border-green-85 border-b' : ''}
                >
                  <td className="p-4 text-sm font-medium">{row.feature}</td>

                  {/* Basic Column */}
                  <td className="border-green-85 border-l p-4 text-center">
                    {row.basic ? (
                      <CheckIcon className="bg-green-70" />
                    ) : (
                      <CrossIcon className="bg-green-90" />
                    )}
                  </td>

                  {/* Premium Column */}
                  <td className="border-green-85 border-l p-4 text-center">
                    {row.premium ? (
                      <CheckIcon className="bg-green-70" />
                    ) : (
                      <CrossIcon className="bg-green-90" />
                    )}
                  </td>

                  {/* Ultimate Column */}
                  <td className="border-green-85 border-l p-4 text-center">
                    {row.ultimate ? (
                      <CheckIcon className="bg-green-70" />
                    ) : (
                      <CrossIcon className="bg-green-90" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
