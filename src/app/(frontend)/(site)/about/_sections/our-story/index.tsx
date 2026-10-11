import Image, { StaticImageData } from 'next/image'
import storyOne from './images/story-1.jpg'
import storyTwo from './images/story-2.jpg'
import storyThree from './images/story-3.jpg'
import storyFour from './images/story-4.jpg'
import storyFive from './images/story-5.jpg'
import storySix from './images/story-6.jpg'
import storySeven from './images/story-7.jpg'
import storyEight from './images/story-8.jpg'
import storyNine from './images/story-9.jpg'
import storyTen from './images/story-10.jpg'

// 1. Data ko ek array mein extract kar liya taaki bar-bar HTML na likhna pade
const storyData: { image: StaticImageData; title: string; description: string; date: string }[] = [
  {
    image: storyOne,
    title: 'Inspiring Transformations Story',
    description:
      'Nutritionist continues to empower individuals to transform their lives through personalized nutrition coaching. With an expanding client base and a growing team of experts, we remain committed to our goal of helping people lose weight, improve their health, and lead happier, more fulfilling lives. Our journey of inspiring transformations continues, one client at a time.',
    date: 'July 1, 2025',
  },
  {
    image: storyTwo,
    title: 'Recognition and Accolades Story',
    description:
      'Nutritionist received industry recognition for its excellence in personalized nutrition coaching. Our innovative approach and dedication to client success earned us accolades and solidified our position as a leading provider in the field.',
    date: 'March 10, 2023',
  },
  {
    image: storyThree,
    title: 'Continued Growth Story',
    description:
      'Nutritionist celebrated serving over 5,000 clients, a testament to our commitment to helping individuals achieve their health and weight loss goals. This milestone highlighted the positive impact we have made on the lives of thousands of people.',
    date: 'November 2, 2021',
  },
  {
    image: storyFour,
    title: 'Collaborating for Success Story',
    description:
      'Nutritionist established partnerships with renowned health professionals, including nutritionists, dietitians, and wellness experts. These collaborations allowed us to incorporate diverse perspectives and expertise, ensuring the highest level of guidance for our clients.',
    date: 'July 15, 2019',
  },
  {
    image: storyFive,
    title: 'Enhanced Support Story',
    description:
      'In response to the growing demand for personalized nutrition coaching, Nutritionist expanded its team of qualified nutritionists and dietitians. This milestone enabled us to provide even more individualized care and support to our clients.',
    date: 'April 1, 2018',
  },
  {
    image: storySix,
    title: 'Innovating for Clients Story',
    description:
      'Nutritionist introduced a mobile app, revolutionizing the way clients engage with their personalized nutrition plans. The app allowed for easy tracking of progress, access to resources, and seamless communication with their dedicated nutrition coaches.',
    date: 'January 20, 2017',
  },
  {
    image: storySeven,
    title: 'Celebrating Success Stories',
    description:
      "Nutritionist celebrated its 500th client success story. These stories showcased the positive impact of personalized nutrition coaching on individuals' lives, further motivating our team to continue providing exceptional services.",
    date: 'September 5, 2015',
  },
  {
    image: storyEight,
    title: 'Expanding Reach Story',
    description:
      'Nutritionist expanded its services by launching an online platform, allowing individuals from all over the world to access personalized nutrition plans and expert guidance. This milestone brought convenience and accessibility to our growing client base.',
    date: 'June 10, 2014',
  },
  {
    image: storyNine,
    title: 'Research and Expertise Story',
    description:
      'After extensive research and collaborating with nutrition experts, Sarah Mitchell and her team developed a comprehensive program rooted in scientific knowledge and evidence-based strategies. This milestone marked the establishment of Nutritionist as a trusted source of personalized nutrition coaching.',
    date: 'March 15, 2012',
  },
  {
    image: storyTen,
    title: 'The Inception Story',
    description:
      'On this day, Nutritionist was born with the vision of helping individuals achieve their weight loss and health goals through personalized nutrition coaching. The founder, Sarah Mitchell, recognized the need for a sustainable and effective approach to healthy living, and thus began the journey of Nutritionist.',
    date: 'January 1, 2010',
  },
]

export default function Story() {
  return (
    <section id="our-story" className="scroll-mt-10 py-7.5 lg:py-10">
      <div className="container">
        <div>
          <h1 className="mb-5 text-center text-2xl font-semibold lg:text-4xl">Our Story</h1>
          <p className="mb-7.5 text-center">
            Welcome to Nutritionist, your partner in achieving optimal health through personalized
            nutrition coaching. Our certified nutritionists are here to guide you on your weight
            loss journey.
          </p>

          <div className="border-green-85 bg-green-95 overflow-hidden rounded-lg border">
            {/* 2. Map function lagakar code ko 90% chota aur DRY kar diya */}
            {storyData.map((story, index) => {
              // Har even index (0, 2, 4...) pe Image left me rahegi
              const isImageLeft = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex md:flex-row md:items-center ${
                    isImageLeft
                      ? 'border-green-85 flex-col border-b md:border-none'
                      : 'flex-col-reverse'
                  }`}
                >
                  {isImageLeft ? (
                    <>
                      <StoryImage src={story.image} alt={`story-${index + 1}`} index={index} />
                      <StoryDivider />
                      <StoryText story={story} isImageLeft={isImageLeft} />
                    </>
                  ) : (
                    <>
                      <StoryText story={story} isImageLeft={isImageLeft} />
                      <StoryDivider />
                      <StoryImage src={story.image} alt={`story-${index + 1}`} index={index} />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// 3. UI Blocks ko alag components bana diya taaki loop ekdum clean dikhe
const StoryImage = ({ src, alt, index }: { src: StaticImageData; alt: string; index: number }) => {
  const isAboveTheFold = index < 2
  return (
    <div className="relative aspect-3/2 h-full w-full md:aspect-2.5/3.5 md:w-[calc(50%-6px)] lg:aspect-[3/2.7] xl:aspect-3/2">
      <Image
        src={src}
        alt={alt}
        fill

        // 🔥 FILE SIZE CONTROL:
        // Mobile (<768px): Screen ka lagbhag 90vw lega.
        // Desktop: Grid ke hisaab se 50vw lega.
        sizes="(max-width: 768px) 90vw, 50vw"
        // quality={70} // 👈 100% production standard. Size chota, quality barkarar.

        // 🔥 LCP & SEO OPTIMIZATION:
        priority={index < 2} // Head tag me preload sirf top 2 ke rahenge (SEO kharab na ho)
        loading="eager" // PAR load sabko turant karenge bina wait kiye (Blink khatam)
        decoding="sync"

        // 🔥 ANTI-BLINK (UX OPTIMIZATION):
        placeholder="blur"

        className="object-cover"
      />
    </div>
  )
}

const StoryDivider = () => (
  <div className="bg-green-70 h-3 w-full shrink-0 md:h-auto md:w-3 md:self-stretch"></div>
)

const StoryText = ({
  story,
  isImageLeft,
}: {
  story: (typeof storyData)[0]
  isImageLeft: boolean
}) => (
  <div
    className={`flex w-full flex-col gap-7.5 p-7.5 md:w-[calc(50%-6px)] lg:p-15 ${
      !isImageLeft ? 'md:text-right' : ''
    }`}
  >
    <h2 className="text-dark-green-15 decoration-green-70 text-[24px] font-semibold underline decoration-[3px] underline-offset-8">
      {story.title}
    </h2>
    <p className="text-gray-20 font-medium">{story.description}</p>
    <span className="text-gray-20 font-semibold">{story.date}</span>
  </div>
)
