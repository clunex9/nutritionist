import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Features() {
  const featuresData = [
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-6 object-contain lg:w-7.5"
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
      title: 'Personalized Nutrition Plans',
      description:
        'Receive a tailored nutrition plan designed specifically for your body and goals. Our certified nutritionists will consider your unique needs, dietary preferences, and health conditions to create a plan that suits you best.',
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-6 object-contain lg:w-7.5"
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
      title: 'Guidance from Certified Nutritionists',
      description:
        'Our team of experienced and certified nutritionists will provide professional guidance and support throughout your journey. They will answer your questions, address your concerns, and keep you motivated as you work towards your goals.',
    },
    {
      icon: (
        <svg
          width="40"
          height="42"
          viewBox="0 0 40 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-6 object-contain lg:w-7.5"
        >
          <path
            d="M14.3091 38.8226C15.7153 38.8226 16.5858 38.0357 16.5691 36.663L16.2343 17.8627C16.2343 17.2769 16.4854 16.8416 17.0044 16.6071C19.2142 15.6361 20.1684 14.615 20.0512 11.6853L19.5825 1.40625C19.549 0.669643 19.1137 0.251116 18.4274 0.251116C17.7745 0.251116 17.3727 0.686384 17.3727 1.43973L17.4899 11.4342C17.4899 12.0201 17.1216 12.3884 16.5691 12.3884C15.9999 12.3884 15.5981 12.0368 15.5981 11.4844L15.4307 1.13839C15.414 0.418527 14.9954 0 14.3091 0C13.6227 0 13.2209 0.418527 13.2041 1.13839L13.0367 11.4844C13.0367 12.0368 12.6349 12.3884 12.0658 12.3884C11.5133 12.3884 11.1283 12.0201 11.1283 11.4342L11.2454 1.43973C11.2454 0.686384 10.8604 0.251116 10.1908 0.251116C9.50437 0.251116 9.0691 0.669643 9.03562 1.40625L8.58361 11.6853C8.44968 14.615 9.40392 15.6361 11.6137 16.6071C12.1327 16.8416 12.3838 17.2769 12.3838 17.8627L12.0658 36.663C12.049 38.0357 12.9028 38.8226 14.3091 38.8226ZM27.4006 24.2243L27.049 36.5793C26.9989 38.0357 27.886 38.8226 29.2756 38.8226C30.6986 38.8226 31.5691 38.1027 31.5691 36.7634V1.25558C31.5691 0.401786 30.9831 0 30.3804 0C29.7443 0 29.3259 0.334821 28.7901 1.12165C26.0947 4.90513 24.3203 11.9866 24.3203 18.683V19.5033C24.3203 20.6584 24.7387 21.5123 25.5759 22.0647L26.5636 22.7344C27.1661 23.1529 27.434 23.6217 27.4006 24.2243Z"
            fill="#262626"
          />
        </svg>
      ),
      title: 'Food Tracking and Analysis',
      description:
        'Effortlessly track your food intake using our user-friendly app. Our nutritionists will analyze your data to provide insights into your eating habits, help you identify areas for improvement, and make personalized recommendations.',
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-6 object-contain lg:w-7.5"
        >
          <path
            d="M10.9036 37.3216H28.6826C32.1313 37.3216 33.8723 35.5637 33.8723 32.0816V6.68541C33.8723 3.18653 32.148 1.42871 28.6826 1.42871H24.4304C23.8612 1.42871 23.4762 1.8305 23.4762 2.43318C23.4762 2.51688 23.4762 2.60059 23.4762 2.66755C23.4762 4.84388 22.0029 6.1497 19.7931 6.1497C17.5833 6.1497 16.1101 4.84388 16.1101 2.66755C16.1101 2.60059 16.1101 2.51688 16.1101 2.43318C16.1101 1.8305 15.725 1.42871 15.1558 1.42871H10.9036C7.4382 1.42871 5.71387 3.18653 5.71387 6.68541V32.0816C5.71387 35.5637 7.45494 37.3216 10.9036 37.3216ZM13.4482 13.9008C12.8456 13.9008 12.4103 13.4488 12.4103 12.8461C12.4103 12.2769 12.8456 11.8249 13.4482 11.8249H26.1547C26.7407 11.8249 27.1759 12.2769 27.1759 12.8461C27.1759 13.4488 26.7407 13.9008 26.1547 13.9008H13.4482ZM13.4482 19.8439C12.8456 19.8439 12.4103 19.3919 12.4103 18.8227C12.4103 18.2367 12.8456 17.7847 13.4482 17.7847H19.4583C20.061 17.7847 20.4963 18.2367 20.4963 18.8227C20.4963 19.3919 20.061 19.8439 19.4583 19.8439H13.4482Z"
            fill="#262626"
          />
        </svg>
      ),
      title: 'Meal Planning and Recipes',
      description:
        'Access a vast collection of delicious and healthy recipes tailored to your dietary needs. Our nutritionists will also create personalized meal plans, making it easier for you to stay on track and enjoy nutritious meals.',
    },
    {
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-6 object-contain lg:w-7.5"
        >
          <path
            d="M2.64921 20.4189C3.5493 20.4189 4.23825 19.7299 4.23825 18.8521V10.4513C4.23825 9.56234 3.5493 8.86228 2.64921 8.86228C1.76024 8.86228 1.07129 9.56234 1.07129 10.4513V18.8521C1.07129 19.7299 1.76024 20.4189 2.64921 20.4189ZM7.9275 22.8748C9.40541 22.8748 10.4388 21.8857 10.4388 20.4856V8.82894C10.4388 7.41769 9.40541 6.42871 7.9275 6.42871C6.46068 6.42871 5.42726 7.41769 5.42726 8.82894V20.4856C5.42726 21.8857 6.46068 22.8748 7.9275 22.8748ZM11.7279 16.7964H18.6285V12.5071H11.7279V16.7964ZM22.4288 22.8748C23.9068 22.8748 24.9402 21.8857 24.9402 20.4856V8.82894C24.9402 7.41769 23.9068 6.42871 22.4288 6.42871C20.9621 6.42871 19.9286 7.41769 19.9286 8.82894V20.4856C19.9286 21.8857 20.9621 22.8748 22.4288 22.8748ZM27.5961 20.4189C28.485 20.4189 29.185 19.7299 29.185 18.8521V10.4513C29.185 9.56234 28.485 8.86228 27.5961 8.86228C26.7071 8.86228 26.0181 9.56234 26.0181 10.4513V18.8521C26.0181 19.7299 26.7071 20.4189 27.5961 20.4189Z"
            fill="#262626"
          />
        </svg>
      ),
      title: 'Lifestyle and Behavior Coaching',
      description:
        'Achieving sustainable results requires more than just a diet plan. Our nutritionists will work with you to develop healthy habits, address emotional eating, and provide strategies to overcome obstacles along the way.',
    },
    {
      icon: (
        <svg
          width="30"
          height="33"
          viewBox="0 0 30 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-6 object-contain lg:w-7.5"
        >
          <path
            d="M10.778 31.4899H18.4496C22.819 31.4899 24.9786 29.2801 24.9409 24.8605C24.8907 19.8131 24.8656 16.1467 24.74 13.397C24.376 5.3111 22.1033 2.93806 14.62 2.93806C7.13679 2.93806 4.85163 5.3111 4.48751 13.397C4.36195 16.1467 4.33684 19.8131 4.28662 24.8605C4.24895 29.2801 6.40855 31.4899 10.778 31.4899ZM10.4138 26.5053C9.33405 26.5053 8.64348 25.8021 8.64348 24.7475V18.2687C8.64348 17.2015 9.33405 16.4983 10.4138 16.4983H18.8263C19.8935 16.4983 20.5841 17.2015 20.5841 18.2687V24.7475C20.5841 25.8021 19.8935 26.5053 18.8263 26.5053H10.4138ZM8.64348 21.3324H20.5841V19.8381H8.64348V21.3324ZM14.62 0C12.2093 0 10.5143 1.63226 10.5143 3.85464H12.2847C12.2847 2.63672 13.2389 1.77036 14.62 1.77036C15.9886 1.77036 16.9555 2.63672 16.9555 3.85464H18.7258C18.7258 1.63226 17.0182 0 14.62 0Z"
            fill="#262626"
          />
        </svg>
      ),
      title: 'Nutritional Education and Workshops',
      description:
        'Expand your knowledge of nutrition through informative articles and educational workshops. Our nutritionists will equip you with the knowledge and tools to make informed choices for long-term success.',
    },
  ]

  return (
    <section id="features" className="scroll-mt-10 py-7.5 lg:py-10">
      {/* Header */}
      <div className="container">
        <h2 className="text-gray-15 text-center text-[28px] font-bold lg:text-[38px]">Features</h2>
        <p className="text-gray-20 mt-2 text-center text-sm lg:text-[16px]">
          Welcome to the Feature Section of Nutritionist, your ultimate destination for all things
          nutrition and wellness.
        </p>
      </div>

      {/* Cards */}
      <div className="container mt-7.5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {featuresData.map(({ icon, title, description }, index) => (
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
            <CardContent className="mt-3 p-0">
              <p className="text-gray-20 text-sm font-medium lg:text-[16px]">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
