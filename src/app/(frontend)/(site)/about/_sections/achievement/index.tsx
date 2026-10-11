import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Achievement() {
  const achievements = [
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // className="h-6 w-6 object-contain lg:h-7.5 lg:w-7.5"
        >
          <g clipPath="url(#clip0_112_101)">
            <path
              d="M9.56101 2.70145C8.7407 4.59319 8.35566 6.48493 8.35566 8.32644C8.35566 14.4369 12.6748 19.4426 19.4047 19.4426C26.1347 19.4426 30.4539 14.4369 30.4539 8.32644C30.4539 6.48493 30.0689 4.59319 29.2653 2.70145C28.897 1.89788 27.9427 1.78069 27.3066 2.43359L23.5566 6.25056L20.359 2.11551C19.84 1.44587 18.9694 1.44587 18.4673 2.11551L15.2697 6.25056L11.503 2.43359C10.8668 1.78069 9.91257 1.89788 9.56101 2.70145ZM18.0654 36.485C18.0654 37.2383 18.6514 37.7406 19.4047 37.7406C28.0599 37.7406 36.0119 32.4001 38.6236 24.9001C38.9919 23.8788 38.6067 23.226 37.5186 23.226C28.9639 23.226 22.8031 28.2483 20.3256 34.5931L20.7609 35.1624V17.7517H18.0654V36.485ZM15.772 30.0898C12.6246 26.005 7.58556 23.226 1.2407 23.226C0.152528 23.226 -0.232516 23.8788 0.135787 24.9001C2.37909 31.3957 8.60677 36.284 15.9059 37.4391C15.8221 37.1546 15.772 36.8197 15.772 36.485V30.0898Z"
              fill="#262626"
            />
          </g>
          <defs>
            <clipPath id="clip0_112_101">
              <rect
                width="38.7593"
                height="36.3114"
                fill="white"
                transform="translate(0 1.42871)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      title: '10,000+ Transformations',
      description:
        'Our personalized nutrition plans have helped thousands of individuals reach their weight loss goals and maintain a healthy lifestyle.',
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_112_111)">
            <path
              d="M37.2509 11.7807L24.2404 5.82702C22.8849 5.2157 21.7818 4.92332 20.6787 4.9499C19.589 4.92332 18.4859 5.2157 17.1172 5.82702L4.11993 11.7807C3.2694 12.1662 2.85742 12.8439 2.85742 13.5217C2.85742 14.1994 3.2694 14.864 4.11993 15.2627L9.59526 17.7611L18.0076 13.8141C17.9279 13.7211 17.9012 13.6147 17.9012 13.5217C17.9012 12.6844 19.3099 12.0465 20.7319 12.0465C22.1672 12.0465 23.5494 12.6844 23.5494 13.5217C23.5494 14.3855 22.1672 15.0367 20.7319 15.0367C20.2934 15.0367 19.8549 14.9702 19.4694 14.864L11.4425 18.6249L17.1172 21.2297C18.4859 21.8542 19.589 22.1201 20.6787 22.1068C21.7818 22.1201 22.8849 21.8542 24.2404 21.2297L37.2509 15.2627C38.1014 14.864 38.5134 14.1994 38.5134 13.5217C38.5134 12.8439 38.1014 12.1662 37.2509 11.7807ZM11.3894 20.5918V28.6719C13.622 30.0274 16.8115 30.8513 20.6787 30.8513C28.5197 30.8513 33.5697 27.4891 33.5697 23.5155V18.9438L24.9979 22.8643C23.443 23.582 22.0344 23.9408 20.6787 23.9275C19.3365 23.9408 17.9145 23.582 16.3596 22.8643L11.3894 20.5918ZM7.80116 18.9438V23.5155C7.80116 24.6717 8.46564 26.1069 9.6617 27.3296V19.8077L7.80116 18.9438ZM9.6617 31.755H11.3894V28.6719C10.7249 28.2732 10.1401 27.8214 9.6617 27.3296V31.755ZM8.61183 31.8481V35.3433C8.61183 36.3932 9.2896 37.0709 10.3395 37.0709H10.6983C11.7482 37.0709 12.4259 36.3932 12.4259 35.3433V31.8481C12.4259 30.7982 11.7482 30.1204 10.6983 30.1204H10.3395C9.2896 30.1204 8.61183 30.7982 8.61183 31.8481Z"
              fill="#262626"
            />
          </g>
          <defs>
            <clipPath id="clip0_112_111">
              <rect width="40" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: 'Recognition for Excellence',
      description:
        'Nutritionist has been recognized as a leading provider of personalized nutrition coaching, receiving accolades for our innovative approach and commitment to client success.',
    },
    {
      icon: (
        <svg
          width="40"
          height="42"
          viewBox="0 0 40 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.3091 38.8226C15.7153 38.8226 16.5858 38.0357 16.5691 36.663L16.2343 17.8627C16.2343 17.2769 16.4854 16.8416 17.0044 16.6071C19.2142 15.6361 20.1684 14.615 20.0512 11.6853L19.5825 1.40625C19.549 0.669643 19.1137 0.251116 18.4274 0.251116C17.7745 0.251116 17.3727 0.686384 17.3727 1.43973L17.4899 11.4342C17.4899 12.0201 17.1216 12.3884 16.5691 12.3884C15.9999 12.3884 15.5981 12.0368 15.5981 11.4844L15.4307 1.13839C15.414 0.418527 14.9954 0 14.3091 0C13.6227 0 13.2209 0.418527 13.2041 1.13839L13.0367 11.4844C13.0367 12.0368 12.6349 12.3884 12.0658 12.3884C11.5133 12.3884 11.1283 12.0201 11.1283 11.4342L11.2454 1.43973C11.2454 0.686384 10.8604 0.251116 10.1908 0.251116C9.50437 0.251116 9.0691 0.669643 9.03562 1.40625L8.58361 11.6853C8.44968 14.615 9.40392 15.6361 11.6137 16.6071C12.1327 16.8416 12.3838 17.2769 12.3838 17.8627L12.0658 36.663C12.049 38.0357 12.9028 38.8226 14.3091 38.8226ZM27.4006 24.2243L27.049 36.5793C26.9989 38.0357 27.886 38.8226 29.2756 38.8226C30.6986 38.8226 31.5691 38.1027 31.5691 36.7634V1.25558C31.5691 0.401786 30.9831 0 30.3804 0C29.7443 0 29.3259 0.334821 28.7901 1.12165C26.0947 4.90513 24.3203 11.9866 24.3203 18.683V19.5033C24.3203 20.6584 24.7387 21.5123 25.5759 22.0647L26.5636 22.7344C27.1661 23.1529 27.434 23.6217 27.4006 24.2243Z"
            fill="#262626"
          />
        </svg>
      ),
      title: 'Positive Client Reviews',
      description:
        'We have received numerous testimonials from satisfied clients who have experienced significant improvements in their health, weight, and overall well-being through our coaching program.',
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9036 37.3216H28.6826C32.1313 37.3216 33.8723 35.5637 33.8723 32.0816V6.68541C33.8723 3.18653 32.148 1.42871 28.6826 1.42871H24.4304C23.8612 1.42871 23.4762 1.8305 23.4762 2.43318C23.4762 2.51688 23.4762 2.60059 23.4762 2.66755C23.4762 4.84388 22.0029 6.1497 19.7931 6.1497C17.5833 6.1497 16.1101 4.84388 16.1101 2.66755C16.1101 2.60059 16.1101 2.51688 16.1101 2.43318C16.1101 1.8305 15.725 1.42871 15.1558 1.42871H10.9036C7.4382 1.42871 5.71387 3.18653 5.71387 6.68541V32.0816C5.71387 35.5637 7.45494 37.3216 10.9036 37.3216ZM13.4482 13.9008C12.8456 13.9008 12.4103 13.4488 12.4103 12.8461C12.4103 12.2769 12.8456 11.8249 13.4482 11.8249H26.1547C26.7407 11.8249 27.1759 12.2769 27.1759 12.8461C27.1759 13.4488 26.7407 13.9008 26.1547 13.9008H13.4482ZM13.4482 19.8439C12.8456 19.8439 12.4103 19.3919 12.4103 18.8227C12.4103 18.2367 12.8456 17.7847 13.4482 17.7847H19.4583C20.061 17.7847 20.4963 18.2367 20.4963 18.8227C20.4963 19.3919 20.061 19.8439 19.4583 19.8439H13.4482Z"
            fill="#262626"
          />
        </svg>
      ),
      title: 'Collaborate With Top Health Experts.',
      description:
        'Nutritionist has established partnerships with respected nutritionists, dietitians, and health experts to ensure that our clients receive the highest quality guidance and support.',
    },
  ]
  return (
    <section id="achievement" className="scroll-mt-10 py-7.5 lg:py-10">
      <div className="container">
        <h2 className="text-gray-15 mb-5 text-center text-2xl font-semibold lg:text-4xl">
          Company Achievements
        </h2>
        <p className="text-gray-20 text-center text-sm lg:text-base">
          At Nutritionist, we take pride in our accomplishments and the positive impact we have made
          on the lives of our clients. Here are some of our notable achievements
        </p>
      </div>

      <div className="container mt-7.5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {achievements.map(({ icon, title, description }, index) => (
          <Card key={index} className="border-green-85 bg-green-95 rounded-lg border p-7.5 ring-0">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-4">
                <div className="bg-green-70 hover:bg-green-70 flex size-9 shrink-0 items-center justify-center rounded-sm border-none p-2 lg:size-12">
                  {icon}
                </div>
                <span className="text-gray-15 text-[18px] leading-tight font-semibold lg:text-[20px]">
                  {title}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-20 text-sm font-medium lg:text-[16px]">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
