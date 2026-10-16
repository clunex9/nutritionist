// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Avatar, AvatarFallback } from '@/components/ui/avatar'
// import AddToFavorite from '@/components/shared/add-to-favorite'
// import AddToBookmark from '@/components/shared/add-to-bookmark'

// // Payload API imports
// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { cookies } from 'next/headers'

// // Types
// import type { Blog, BlogImage, User, Avatar as AvatarType } from '@/payload-types'

// export default async function Blogs() {
//   const payload = await getPayload({ config: configPromise })

//   // 1. Home page ke liye sirf Latest 4 blogs fetch karein
//   const { docs: blogs } = (await payload.find({
//     collection: 'blogs',
//     depth: 2,
//     limit: 4,
//     sort: '-createdAt',
//   })) as unknown as { docs: Blog[] }

//   // 2. User Auth Check
//   const cookieStore = await cookies()
//   const token = cookieStore.get('payload-token')?.value
//   let userId = null
//   let userFavoriteBlogsIds: string[] = []
//   let userBookmarkBlogsIds: string[] = []

//   if (token) {
//     try {
//       const { user } = await payload.auth({
//         headers: new Headers({ Authorization: `JWT ${token}` }),
//       })
//       userId = user?.id || null

//       if (userId) {
//         // Sirf un 4 blogs ki IDs nikal rahe hain jo screen par render honge
//         const displayedBlogIds = blogs.map((b) => b.id)

//         // Promise.all use karke Favs aur Books dono ko ek sath (parallel) fetch kar rahe hain
//         const [userFavs, userBooks] = await Promise.all([
//           payload.find({
//             collection: 'favorites',
//             where: {
//               and: [
//                 { user: { equals: userId } },
//                 { blog: { in: displayedBlogIds } }, // Sirf inhi 4 blogs ka data aayega
//               ],
//             },
//             depth: 0,
//             pagination: false,
//           }),
//           payload.find({
//             collection: 'bookmarks',
//             where: {
//               and: [
//                 { user: { equals: userId } },
//                 { blog: { in: displayedBlogIds } }, // Sirf inhi 4 blogs ka data aayega
//               ],
//             },
//             depth: 0,
//             pagination: false,
//           }),
//         ])

//         userFavoriteBlogsIds = userFavs.docs
//           .map((fav: Record<string, any>) =>
//             typeof fav.blog === 'string' ? fav.blog : fav.blog?.id,
//           )
//           .filter(Boolean) as string[]

//         userBookmarkBlogsIds = userBooks.docs
//           .map((book: Record<string, any>) =>
//             typeof book.blog === 'string' ? book.blog : book.blog?.id,
//           )
//           .filter(Boolean) as string[]
//       }
//     } catch (e) {
//       console.error('Failed to authenticate user in Blogs.tsx')
//     }
//   }

//   if (!blogs || blogs.length === 0) return null

//   return (
//     <section id="blogs" className="scroll-mt-10 py-10 lg:py-16">
//       <div className="container">
//         <h2 className="text-gray-15 text-center text-[28px] font-bold lg:text-[38px]">
//           Latest Articles
//         </h2>
//         <p className="text-gray-20 mx-auto mt-2 max-w-2xl text-center text-sm lg:text-[16px]">
//           Discover informative and engaging articles written by our team of nutritionists,
//           dietitians, and wellness experts.
//         </p>
//       </div>

//       <div className="container mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
//         {blogs.map((blog: Blog, index: number) => {
//           // 🔥 Team section ki tarah simple Type Guard aur URL extraction
//           const coverImage =
//             typeof blog.image === 'object' && blog.image !== null ? (blog.image as BlogImage) : null
//           const finalCoverImageUrl = coverImage?.url || ''

//           const author =
//             typeof blog.author === 'object' && blog.author !== null ? (blog.author as User) : null
//           const authorAvatar =
//             typeof author?.avatar === 'object' && author?.avatar !== null
//               ? (author.avatar as AvatarType)
//               : null
//           const finalAvatarUrl = authorAvatar?.thumbnailURL || authorAvatar?.url || ''

//           const initials = author?.name
//             ? author?.name
//                 .trim()
//                 .split(/\s+/)
//                 .map((n: string) => n[0])
//                 .join('')
//                 .substring(0, 2)
//                 .toUpperCase()
//             : 'U'

//           return (
//             <Card
//               key={blog.id}
//               className="bg-green-95 border-green-85 flex flex-col rounded-lg border p-6 ring-0 lg:p-7.5"
//             >
//               <div className="relative mb-4 aspect-3/2 w-full overflow-hidden rounded-lg lg:mb-6">
//                 {finalCoverImageUrl ? (
//                   <Image
//                     src={finalCoverImageUrl}
//                     alt={blog.title}
//                     fill // 👈 Aspect-3/2 parent ke sath shape maintain karega
//                     priority={index < 2} // 🔥 Pehle 2 cards instantly load honge
//                     fetchPriority={index < 2 ? 'high' : 'auto'}
//                     decoding={index < 2 ? 'sync' : 'async'}
//                     // 👇 Mobile par 100% width, Tablet/Desktop par Grid(2) hone ki wajah se 50vw
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                     className="object-cover transition-transform duration-500 hover:scale-105"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center bg-gray-200">
//                     <span className="text-sm text-gray-500">No Image</span>
//                   </div>
//                 )}
//               </div>

//               <CardHeader className="p-0">
//                 <span className="text-gray-20 text-sm font-medium lg:text-[16px]">
//                   {blog.category}
//                 </span>
//                 <CardTitle className="text-gray-15 mt-2 text-[20px] leading-tight font-semibold lg:text-[22px]">
//                   <Link
//                     href={`/blogs/${blog.id}`}
//                     className="hover:text-dark-green-20 transition-colors hover:underline"
//                   >
//                     {blog.title}
//                   </Link>
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="mt-3 grow p-0">
//                 <CardDescription className="text-gray-30 line-clamp-3 text-sm leading-relaxed font-medium lg:text-[16px]">
//                   {blog.description}
//                 </CardDescription>
//               </CardContent>

//               <CardFooter className="mt-5 border-0 p-0">
//                 <div className="bg-green-97 border-green-85 flex w-full flex-col items-center justify-between gap-5 rounded-lg border p-4 sm:flex-row">
//                   <div className="flex w-full items-center gap-4">
//                     <Avatar className="bg-dark-green-15 size-10 shrink-0 overflow-hidden rounded-md lg:size-12.5">
//                       {finalAvatarUrl ? (
//                         <Image
//                           src={finalAvatarUrl}
//                           alt={author?.name || 'Author'}
//                           fill
//                           sizes="(max-width: 1024px) 40px, 50px"
//                           className="object-cover"
//                         />
//                       ) : (
//                         <AvatarFallback className="text-green-95 bg-dark-green-15 rounded-md font-bold uppercase">
//                           {initials}
//                         </AvatarFallback>
//                       )}
//                     </Avatar>

//                     <div className="flex flex-col">
//                       <span className="text-dark-green-15 leading-none font-semibold lg:text-lg">
//                         {author?.name || 'Anonymous'}
//                       </span>
//                       <span className="text-gray-35 mt-1 text-sm font-medium lg:text-[16px]">
//                         {new Date(blog.createdAt).toLocaleDateString('en-GB', {
//                           day: 'numeric',
//                           month: 'short',
//                           year: 'numeric',
//                         })}{' '}
//                         - {blog.readTime}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="ml-auto flex gap-2">
//                     <AddToFavorite
//                       id={blog.id}
//                       initialFavorited={userFavoriteBlogsIds.includes(blog.id)}
//                     />
//                     <AddToBookmark
//                       id={blog.id}
//                       initialBookmarked={userBookmarkBlogsIds.includes(blog.id)}
//                     />
//                   </div>
//                 </div>
//               </CardFooter>
//             </Card>
//           )
//         })}
//       </div>
//     </section>
//   )
// }

// Payload API imports
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'

// Types
import type { Blog } from '@/payload-types'

// Client Component Import
import BlogsClient from './blogs-client' // Apne path ke hisab se adjust karein

export default async function Blogs() {
  const payload = await getPayload({ config: configPromise })

  // 1. Home page ke liye sirf Latest 4 blogs fetch karein
  const { docs: blogs } = (await payload.find({
    collection: 'blogs',
    depth: 2,
    limit: 4,
    sort: '-createdAt',
  })) as unknown as { docs: Blog[] }

  // 2. User Auth Check
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  let userId = null
  let userFavoriteBlogsIds: string[] = []
  let userBookmarkBlogsIds: string[] = []

  if (token) {
    try {
      const { user } = await payload.auth({
        headers: new Headers({ Authorization: `JWT ${token}` }),
      })
      userId = user?.id || null

      if (userId) {
        const displayedBlogIds = blogs.map((b) => b.id)

        const [userFavs, userBooks] = await Promise.all([
          payload.find({
            collection: 'favorites',
            where: {
              and: [{ user: { equals: userId } }, { blog: { in: displayedBlogIds } }],
            },
            depth: 0,
            pagination: false,
          }),
          payload.find({
            collection: 'bookmarks',
            where: {
              and: [{ user: { equals: userId } }, { blog: { in: displayedBlogIds } }],
            },
            depth: 0,
            pagination: false,
          }),
        ])

        userFavoriteBlogsIds = userFavs.docs
          .map((fav: Record<string, any>) =>
            typeof fav.blog === 'string' ? fav.blog : fav.blog?.id,
          )
          .filter(Boolean) as string[]

        userBookmarkBlogsIds = userBooks.docs
          .map((book: Record<string, any>) =>
            typeof book.blog === 'string' ? book.blog : book.blog?.id,
          )
          .filter(Boolean) as string[]
      }
    } catch (e) {
      console.error('Failed to authenticate user in Blogs.tsx')
    }
  }

  if (!blogs || blogs.length === 0) return null

  // Data pass to Client Component for GSAP Animations
  return (
    <BlogsClient
      blogs={blogs}
      userFavoriteBlogsIds={userFavoriteBlogsIds}
      userBookmarkBlogsIds={userBookmarkBlogsIds}
    />
  )
}
