const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mx-auto h-7 w-7 rounded-sm p-1.5 ${className}`}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.7045 4.15347C17.034 4.4045 17.0976 4.87509 16.8466 5.20457L8.84657 15.7046C8.71541 15.8767 8.51627 15.9838 8.30033 15.9984C8.08439 16.0129 7.87271 15.9334 7.71967 15.7804L3.21967 11.2804C2.92678 10.9875 2.92678 10.5126 3.21967 10.2197C3.51256 9.92682 3.98744 9.92682 4.28033 10.2197L8.17351 14.1129L15.6534 4.29551C15.9045 3.96603 16.3751 3.90243 16.7045 4.15347Z"
      fill="#262626"
    />
  </svg>
)

const CrossIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mx-auto h-7 w-7 rounded-sm p-1.5 ${className}`}
  >
    <path
      d="M6.28033 5.21967C5.98744 4.92678 5.51256 4.92678 5.21967 5.21967C4.92678 5.51256 4.92678 5.98744 5.21967 6.28033L8.93934 10L5.21967 13.7197C4.92678 14.0126 4.92678 14.4874 5.21967 14.7803C5.51256 15.0732 5.98744 15.0732 6.28033 14.7803L10 11.0607L13.7197 14.7803C14.0126 15.0732 14.4874 15.0732 14.7803 14.7803C15.0732 14.4874 15.0732 14.0126 14.7803 13.7197L11.0607 10L14.7803 6.28033C15.0732 5.98744 15.0732 5.51256 14.7803 5.21967C14.4874 4.92678 14.0126 4.92678 13.7197 5.21967L10 8.93934L6.28033 5.21967Z"
      fill="#262626"
    />
  </svg>
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
