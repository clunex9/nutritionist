'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import AddToFavorite from '@/components/shared/add-to-favorite'
import AddToBookmark from '@/components/shared/add-to-bookmark'
import type { Blog, BlogImage, User, Avatar as AvatarType } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

interface BlogsClientProps {
  blogs: Blog[]
  userFavoriteBlogsIds: string[]
  userBookmarkBlogsIds: string[]
}

export default function BlogsClient({
  blogs,
  userFavoriteBlogsIds,
  userBookmarkBlogsIds,
}: BlogsClientProps) {
  const blogsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section Header Animation
      gsap.to('.blogs-header > *', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.blogs-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // 2. Card ka Outer Box (Frame) animate karna
      // (Jab card thoda sa bhi screen mein aaye, toh uska background/border dikh jaye)
      gsap.utils.toArray<HTMLElement>('.blog-card').forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%', // Jaise hi card screen ke bottom ko touch kare
            toggleActions: 'play none none reverse',
          },
        })
      })

      // 3. 🔥 MAIN LOGIC: Har individual element (Image, Title, Desc, Footer) ka apna ScrollTrigger
      gsap.utils.toArray<HTMLElement>('.animate-item').forEach((item) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item, // Element khud apna trigger point banega
            start: 'top 90%', // Jaise hi yeh specific element screen ke bottom (95%) par aayega, tab animate hoga
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, blogsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={blogsRef} id="blogs" className="scroll-mt-10 py-10 lg:py-16">
      {/* Header */}
      <div className="blogs-header container">
        <h2 className="text-gray-15 translate-y-10 text-center text-[28px] font-bold opacity-0 lg:text-[38px]">
          Latest Articles
        </h2>
        <p className="text-gray-20 mx-auto mt-2 max-w-2xl translate-y-10 text-center text-sm opacity-0 lg:text-[16px]">
          Discover informative and engaging articles written by our team of nutritionists,
          dietitians, and wellness experts.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="container mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {blogs.map((blog: Blog, index: number) => {
          const coverImage =
            typeof blog.image === 'object' && blog.image !== null ? (blog.image as BlogImage) : null
          const finalCoverImageUrl = coverImage?.url || ''

          const author =
            typeof blog.author === 'object' && blog.author !== null ? (blog.author as User) : null
          const authorAvatar =
            typeof author?.avatar === 'object' && author?.avatar !== null
              ? (author.avatar as AvatarType)
              : null
          const finalAvatarUrl = authorAvatar?.thumbnailURL || authorAvatar?.url || ''

          const initials = author?.name
            ? author?.name
                .trim()
                .split(/\s+/)
                .map((n: string) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()
            : 'U'

          return (
            <Card
              key={blog.id}
              className="blog-card border-green-85 bg-green-95 flex translate-y-10 flex-col rounded-lg border p-6 opacity-0 ring-0 lg:p-7.5"
            >
              {/* Cover Image Wrapper - No style changed, only animation class added */}
              <div className="animate-item relative mb-4 aspect-3/2 w-full translate-y-6 overflow-hidden rounded-lg opacity-0 lg:mb-6">
                {finalCoverImageUrl ? (
                  <Image
                    src={finalCoverImageUrl}
                    alt={blog.title}
                    fill
                    priority={index < 2}
                    fetchPriority={index < 2 ? 'high' : 'auto'}
                    decoding={index < 2 ? 'sync' : 'async'}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200">
                    <span className="text-sm text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Card Header */}
              <CardHeader className="animate-item translate-y-6 p-0 opacity-0">
                <span className="text-gray-20 text-sm font-medium lg:text-[16px]">
                  {blog.category}
                </span>
                <CardTitle className="text-gray-15 mt-2 text-[20px] leading-tight font-semibold lg:text-[22px]">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="hover:text-dark-green-20 transition-colors hover:underline"
                  >
                    {blog.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="animate-item mt-3 grow translate-y-6 p-0 opacity-0">
                <CardDescription className="text-gray-30 line-clamp-3 text-sm leading-relaxed font-medium lg:text-[16px]">
                  {blog.description}
                </CardDescription>
              </CardContent>

              {/* Card Footer */}
              <CardFooter className="animate-item mt-5 translate-y-6 border-0 p-0 opacity-0">
                <div className="bg-green-97 border-green-85 flex w-full flex-col items-center justify-between gap-5 rounded-lg border p-4 sm:flex-row">
                  <div className="flex w-full items-center gap-4">
                    <Avatar className="bg-dark-green-15 size-10 shrink-0 overflow-hidden rounded-md lg:size-12.5">
                      {finalAvatarUrl ? (
                        <Image
                          src={finalAvatarUrl}
                          alt={author?.name || 'Author'}
                          fill
                          sizes="(max-width: 1024px) 40px, 50px"
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="text-green-95 bg-dark-green-15 rounded-md font-bold uppercase">
                          {initials}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex flex-col">
                      <span className="text-dark-green-15 leading-none font-semibold lg:text-lg">
                        {author?.name || 'Anonymous'}
                      </span>
                      <span className="text-gray-35 mt-1 text-sm font-medium lg:text-[16px]">
                        {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        - {blog.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="ml-auto flex gap-2">
                    <AddToFavorite
                      id={blog.id}
                      initialFavorited={userFavoriteBlogsIds.includes(blog.id)}
                    />
                    <AddToBookmark
                      id={blog.id}
                      initialBookmarked={userBookmarkBlogsIds.includes(blog.id)}
                    />
                  </div>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
